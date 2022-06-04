import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"

const QUERY = `
query GetContributions($bountyId: String!) {
    contributions(where: {bountyId: $bountyId} ) {
      id
      bountyId
      sender
      contributionId
      contributor
      amount
      createdAt
    }
  }
`;

export type Contribution = {
    id: string
    bountyId: string
    sender: string
    contributionId: string
    contributor: string
    amount: string
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

export const performedActions = async (bountyId?: string): Promise<Contribution[]> => {
  const result = await request(bountyId);
  return result.data.contributions;
};