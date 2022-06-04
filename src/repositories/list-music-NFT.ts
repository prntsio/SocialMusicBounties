import { gql } from '@apollo/client/core';
import { subgraphClient } from "../app/services/MusicClient"

const QUERY = `
{
  musicNFTs {
    id
    sender
    owner
    tokenURI
    tokenId
    # createdAt
  }
}
`;

export type MusicNFT = {
    id: string
    sender: string
    owner: string
    tokenURI: string
    tokenId: string
    // createdAt: string
}

const request = () => {
  return subgraphClient.query({
    query: gql(QUERY),
  });
};

export const musicNFTs = async (): Promise<MusicNFT[]> => {
  const result = await request();
  console.log(result)
  return result.data.musicNFTs;
};