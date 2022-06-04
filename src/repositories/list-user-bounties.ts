import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"
import { Bounty } from './list-bounties';

const BOUNTIES = `
query GetBounties($sender: String!) {
  bounties(where: {sender: $sender} ) {
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
  }
}
`;

const getTimelineRequest = (sender?: string) => {
  return subgraphClient.query({
    query: gql(BOUNTIES),
    variables: {
      sender,
    },
  });
};

export const bounties = async (sender?: string): Promise<Bounty[]> => {
  const result = await getTimelineRequest(sender);
  return result.data.bounties;
};