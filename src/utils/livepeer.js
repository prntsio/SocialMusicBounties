import { videonft } from '@livepeer/video-nft'
import {providers} from 'ethers'
import config from '../config/config'
const apiOpts = {
  auth: { apiKey: '5f8c2021-d15f-43a9-9a29-c37ed7be0447' },
  // defaults to current origin if not specified
  endpoint: videonft.api.prodApiEndpoint
};
const provider = new providers.AlchemyProvider(config.chainId, 'I4KCixYGLCmDLITHwE6eL0NE9HEIpb60');
const minter = new videonft.minter.FullMinter(apiOpts, { ethereum: provider, chainId: config.chainId });
// file is optional, will open a file picker if not provided.
export async function mintNft(file) {
  const nftInfo = await minter.createNft({
    name: 'My NFT',
    file,
    nftMetadata: {
      description: 'My NFT description',
      traits: { 'my-custom-trait': 'my-custom-value' }
    }
  });
  console.log(`minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`);
  return nftInfo;
}