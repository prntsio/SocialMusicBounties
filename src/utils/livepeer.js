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

export async function upload (file, owner) {
  // const file = await minter.uploader.pickFile();
  let asset = await minter.api.createAsset('My NFT', file);
  console.log(asset)
  return;
  const uploader = new videonft.minter.Uploader();
  uploader.pickFile().then(f => console.log(f)).catch(console.log)
}





// file is optional, will open a file picker if not provided.
export async function mintNft(file, owner) {
  console.log('asdf')
  let asset = await minter.api.createAsset('My NFT', file, (progress => {
    console.log(progress)
  }));

/*
async function mintNft() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    let ethereum = window.ethereum;
    let chainId = window.ethereum.chainId;


    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    console.log(ethereum)
    console.log(chainId);

    const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId });
    const mintBtn = document.getElementById('mint-btn');

    console.log(minter);
    let file = window.livepeer.files[0];
    let title = document.getElementById("title").value || "My NFT";
    // two vars below added by me; all appear correctly in console
    //let artist = document.getElementById("arist").value || "Artist Name";
    //let genre = document.getElementById("genre").value || "Genre";
    console.log(title)
    //console.log(artist)
    //console.log(genre)
    console.log(file)
    console.log('create asset', minter.api.createAsset);
    let progressBar = document.getElementById('progress-bar')
    mintBtn.innerText = "Creating Mintable Video Asset..."

    let asset = await minter.api.createAsset(title, file, (progress) => {
        console.log('progress: ', progress)
        progressBar.style.width = `${progress * 100 }%`;
    });

    mintBtn.innerText = 'Minting....'
    console.log("asset", asset);
    // // optional, optimizes the video for the NFT
    asset = await minter.api.nftNormalize(asset);
    console.log(asset)
    const nftMetadata = {
        description: 'Bounty submission video',
        traits: { 
            // these metadata values aren't the issue; code fails when commented out
            'Artist Name': 'Almighty Zay'
        }
    };
    console.log("metadata", nftMetadata)

    const nftInfo = await minter.createNft({
        name: title,
        mint: { 
            contractAddress: '0xe1A31a270082008ed2Ee736671CFb77144Bd532a', 
            to: '0x3a8eBfCcC377b09216586871be539aBFF9aB8ABf' // TODO: Pull from ethers; not MVP
        },
        file,
        nftMetadata
    });

    mintBtn.innerText = `Minted Video with ID ${nftInfo.tokenId}`;
    console.log(`minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`);
    return nftInfo;
}
*/




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
  return ipfs //todo
  const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl, config.nftAddress, owner);
  console.log('minted nft')
  const nftInfo = await minter.web3.getMintedNftInfo(tx);
  console.log(`minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`);
  return nftInfo;
}