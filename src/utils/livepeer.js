import { videonft } from '@livepeer/video-nft'
import {providers} from 'ethers'
import config from '../config/config'
const apiOpts = {
  auth: { apiKey: '3bcfc672-3c29-4b87-988f-53a3b19573b6' }, //this key only works with localhost:3000
  // defaults to current origin if not specified
  endpoint: videonft.api.prodApiEndpoint
};
const provider = new providers.AlchemyProvider(config.chainId, 'I4KCixYGLCmDLITHwE6eL0NE9HEIpb60');
const minter = new videonft.minter.FullMinter(apiOpts, { ethereum: provider, chainId: config.chainId });

export async function upload (file) {
  // const file = await minter.uploader.pickFile();
  let asset = await minter.api.createAsset('My NFT', file);
  console.log(asset)
  return;
  const uploader = new videonft.minter.Uploader();
  uploader.pickFile().then(f => console.log(f)).catch(console.log)
}

// file is optional, will open a file picker if not provided.
export async function mintNft(file) {
  console.log('asdf')
  let asset = await minter.api.createAsset('My NFT', file, (progress => {
    console.log(progress)
  }));
  // optional, optimizes the video for the NFT
  console.log('asset created')
  asset = await minter.api.nftNormalize(asset);
  console.log('normalized')
  const nftMetadata = {
    description: 'My NFT description',
    traits: { 'my-custom-trait': 'my-custom-value' }
  };
  const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata, (progress) => {
    console.log(progress)
  });
  console.log('exported to ipfs: ')
  console.log(ipfs)
  const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
  console.log('minted nft')
  const nftInfo = await minter.web3.getMintedNftInfo(tx);
  console.log(`minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`);
  return nftInfo;
}