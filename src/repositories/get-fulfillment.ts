import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"
import { Bounty } from './list-bounties';

const QUERY = `
    query getFulfillment($bountyId: String!) {
  fulfillments(where: {bountyId: $bountyId} ) {
    id
    bountyId
    sender
    fulfillmentId
    approver
    tokenAmounts
    data
    createdAt
  }
}
`;

const getFulfillmentRequest = (bountyId: string) => {
  return subgraphClient.query({
    query: gql(QUERY),
    variables: {
        bountyId,
      },
  });
};

export const fulfillment = async (bountyId: string): Promise<any> => {
  const result = await getFulfillmentRequest(bountyId);
  return result.data.fulfillments[0];
}; 