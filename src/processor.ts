import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as erc20abi from './abi/erc20'

export const VITALIK_ETH_TOPIC = '0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'https://v2.archive.subsquid.io/network/ethereum-mainnet',
    })
    .addLog({
        topic0: [erc20abi.events.Transfer.topic],
        topic2: [VITALIK_ETH_TOPIC],
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
