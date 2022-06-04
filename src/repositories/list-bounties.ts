import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"
const QUERY = `
{
  bounties {
    id
    bountyId
    sender
    title
    nftHash
    contributersType
    spotifyPlays
    instagramFollowers
    email
    description
    estimatedTime
    featureBountyType
    bountyPrice
    paymentDue
    deadline
    token
    fulfillmentId
    fulfillers
    finalFulfiller
    createdAt
  }
}
`;

export type Bounty = {
  id: string
  bountyId: string
  sender: string
  title: string
  type: string
  nftHash: string
  contributersType: string
  spotifyPlays: string
  instagramFollowers: string
  email: string
  description: string
  estimatedTime: string
  featureBountyType: string
  bountyPrice: string
  paymentDue: string
  deadline: string
  token: string
  fulfillmentId: string
  fulfillers: string
  finalFulfiller: string
  createdAt: string
}

const getTimelineRequest = () => {
  return subgraphClient.query({
    query: gql(QUERY),
  });
};

export const bounties = async (): Promise<Bounty[]> => {
  const result = await getTimelineRequest();
  return result.data.bounties;
};