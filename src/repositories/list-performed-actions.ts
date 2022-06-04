import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"

const QUERY = `
{
    performedActions {
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

export type PerformedAction = {
    id: string
    bountyId: string
    sender: string
    fulfiller: string
    mode: string
    fulfillerToAdd: string
    finalFulfiller: string
    createdAt: string
}

const request = (sender?: string) => {
  return subgraphClient.query({
    query: gql(QUERY),
    variables: {
      sender,
    },
  });
};

export const performedActions = async (sender?: string): Promise<PerformedAction[]> => {
  const result = await request(sender);
  return result.data.performedActions;
};