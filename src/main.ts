import {TypeormDatabase} from '@subsquid/typeorm-store'
import {TransferToVitalik} from './model'
import {processor, VITALIK_ETH_TOPIC} from './processor'
import * as erc20abi from './abi/erc20'

processor.run(new TypeormDatabase({supportHotBlocks: false}), async (ctx) => {
    const transfers: TransferToVitalik[] = []

    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (log.topics[0] === erc20abi.events.Transfer.topic && log.topics[2] === VITALIK_ETH_TOPIC) {
                try {
                    let {from, to, value} = erc20abi.events.Transfer.decode(log)
                    transfers.push(new TransferToVitalik({
                        id: log.id,
                        block: block.header.height,
                        contract: log.address,
                        from,
                        value
                    }))
                }
                catch {
                    ctx.log.error(`cannot decode a Transfer at block ${block.header.height}, skipping it`)
                }
            }
        }
    }

    await ctx.store.upsert(transfers)
})
