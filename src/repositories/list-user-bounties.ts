import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"
import { Bounty } from './list-bounties';

const QUERY = `
query GetBounties($sender: String!) {
  bounties(where: {sender: $sender}, orderBy: createdAt, orderDirection: desc ) {
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

const getTimelineRequest = (sender?: string) => {
  return subgraphClient.query({
    query: gql(QUERY),
    variables: {
      sender,
    },
  });
};

export const bounties = async (sender?: string): Promise<Bounty[]> => {
  const result = await getTimelineRequest(sender);
  return result.data.bounties;
};