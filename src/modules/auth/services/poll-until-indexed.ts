import { gql } from "@apollo/client";
import { apolloClient } from "../../../app/services/ApolloClient";

export const pollUntilIndexed = async (txHash: string) => {
    while (true) {
        const result = await hasTxBeenIndexed(txHash);
        console.log('pool until indexed: result', result.data);

        const response = result.data.hasTxHashBeenIndexed;
        if (response.__typename === 'TransactionIndexedResult') {
            if (response.metadataStatus) {
                if (response.metadataStatus.status === 'SUCCESS') {
                    return response;
                }

                if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
                    throw new Error(response.metadataStatus.reason);
                }
            } else {
                if (response.indexed) {
                    return response;
                }
            }

            console.log('pool until indexed: sleep for 500 milliseconds then try again');

        } else {
            // it got reverted and failed!
            throw new Error(response.reason);
        }
    }
};

const hasTxBeenIndexed = (txHash: string) => {
    return apolloClient.query({
        query: gql(HAS_TX_BEEN_INDEXED),
        variables: {
            request: {
                txHash,
            },
        },
        fetchPolicy: 'network-only',
    })
}

const HAS_TX_BEEN_INDEXED = `
  query($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) { 
             ... on TransactionIndexedResult {
        indexed
                txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
        }
        metadataStatus {
          status
          reason
        }
        }
        ... on TransactionError {
        reason
                txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
        }
        },
            __typename
        }
  }
`
export {}