import { gql } from "@apollo/client/core";
import { getJsonWalletAddress } from "ethers/lib/utils";
import { subgraphClient } from "../app/services/MusicClient";

const QUERY = `
{
  musicNFTs {
    id
    sender
    owner
    tokenURI
    tokenId
    createdAt
  }
}
`;

export type MusicNFT = {
  id: string;
  sender: string;
  owner: string;
  tokenURI: string;
  tokenId: string;
  createdAt: string;
};

const request = () => {
  return subgraphClient.query({
    query: gql(QUERY),
  });
};

export function getVideoURL(tokenURI: string): Promise<any> {
  const url = "https://ipfs.io/ipfs/" + tokenURI.replace("ipfs://", "");
  let data = fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      data = myJson;
    });

    return data;
}

export const musicNFTs = async (): Promise<MusicNFT[]> => {
  const result = await request();
  console.log(result);
  return result.data.musicNFTs;
};
