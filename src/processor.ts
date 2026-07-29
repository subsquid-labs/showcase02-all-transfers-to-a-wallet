import {DataSourceBuilder} from '@subsquid/evm-stream'
import * as erc20abi from './abi/erc20'

export const VITALIK_ETH_TOPIC = '0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045'

export const dataSource = new DataSourceBuilder()
    // The SQD Network Portal is the primary source of blockchain data: it is public,
    // needs no API key, and streams pre-filtered data — including real-time unfinalized
    // blocks — far faster than a plain RPC endpoint.
    .setPortal('https://portal.sqd.dev/datasets/ethereum-mainnet')
    // To use a private or rate-limit-lifted Portal, supply an API key
    // through the HTTP client headers (create a key at https://portal.sqd.dev/app):
    // .setPortal({
    //     url: 'https://portal.sqd.dev/datasets/ethereum-mainnet',
    //     http: {
    //         headers: {'x-api-key': process.env.SQD_API_KEY},
    //     },
    // })
    // Field selection is explicit: there are no default optional fields, so list every
    // field the handler reads.
    .setFields({
        log: {
            address: true,
            topics: true,
            data: true,
        },
    })
    .addLog({
        where: {
            topic0: [erc20abi.events.Transfer.topic],
            topic2: [VITALIK_ETH_TOPIC],
        },
    })
    .build()
