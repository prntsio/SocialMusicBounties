import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/SubgraphApolloClient"
import { Bounty } from './list-bounties';

const BOUNTIES = `
    query GetBounty($bountyId: String!) {
  bounties(where: {bountyId: $bountyId} ) {
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

const getBountyRequest = (bountyId: string) => {
  return subgraphClient.query({
    query: gql(BOUNTIES),
    variables: {
        bountyId,
      },
  });
};

export const bounty = async (bountyId: string): Promise<Bounty> => {
  const result = await getBountyRequest(bountyId);
  return result.data.bounties[0];
}; 