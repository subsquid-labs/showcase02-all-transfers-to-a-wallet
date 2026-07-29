import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {createLogger} from '@subsquid/logger'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {TransferToVitalik} from './model'
import {dataSource, VITALIK_ETH_TOPIC} from './processor'
import * as erc20abi from './abi/erc20'

const log = createLogger('sqd:processor')

run(dataSource, new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const transfers: TransferToVitalik[] = []

    for (let block of ctx.blocks.map(augmentBlock)) {
        for (let evmLog of block.logs) {
            if (evmLog.topics[0] === erc20abi.events.Transfer.topic && evmLog.topics[2] === VITALIK_ETH_TOPIC) {
                try {
                    let {from, to, value} = erc20abi.events.Transfer.decode(evmLog)
                    transfers.push(new TransferToVitalik({
                        id: evmLog.id,
                        block: block.header.number,
                        contract: evmLog.address,
                        from,
                        value
                    }))
                }
                catch {
                    log.error(`cannot decode a Transfer at block ${block.header.number}, skipping it`)
                }
            }
        }
    }

    await ctx.store.upsert(transfers)
})
