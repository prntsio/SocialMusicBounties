import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"
import { PerformedAction } from './list-performed-actions';

const QUERY = `
query GetPerformedActions($bountyId: String!) {
  performedActions(where: {bountyId: $bountyId} ) {
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

const request = (bountyId?: string) => {
  return subgraphClient.query({
    query: gql(QUERY),
    variables: {
      bountyId,
    },
  });
};

export const performedActions = async (bountyId?: string): Promise<PerformedAction[]> => {
  const result = await request(bountyId);
  return result.data.performedActions;
};