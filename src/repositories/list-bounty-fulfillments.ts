import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"

const QUERY = `
query GetFulfillments($bountyId: String!) {
    fulfillments(where: {bountyId: $bountyId} ) {
      id
      bountyId
      sender
      fulfiller
      mode
      fulfillerToAdd
      finalFulfiller
      createdAt
    }
  }
`;

export type Fulfillment = {
    id: string
    bountyId: string
    sender: string
    fulfiller: string
    mode: string
    fulfillerToAdd: string
    finalFulfiller: string
    createdAt: string
}

const request = (bountyId?: string) => {
  return subgraphClient.query({
    query: gql(QUERY),
    variables: {
      bountyId,
    },
  });
};

export const performedActions = async (bountyId?: string): Promise<Fulfillment[]> => {
  const result = await request(bountyId);
  return result.data.fulfillments;
};