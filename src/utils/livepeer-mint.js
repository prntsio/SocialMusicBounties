import { videonft } from '@livepeer/video-nft'
import { providers } from 'ethers'; 
import config from '../config/config'

export const mint = async (title, file) => {
    const apiOpts = {
    auth: { apiKey: '5f8c2021-d15f-43a9-9a29-c37ed7be0447' },
    // defaults to current origin if not specified
    endpoint: videonft.api.prodApiEndpoint
    };
    const provider = new providers.AlchemyProvider(config.chainId, 'I4KCixYGLCmDLITHwE6eL0NE9HEIpb60');
    
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    let ethereum = window.ethereum;
    // const chainId = ethereum.chainId; // or await ethereum.request({ method: 'eth_chainId' });
    const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId: 137 });

    // file is optional, will open a file picker if not provided.
    const nftInfo = await minter.createNft({
        name: title,
        mint: { 
            contractAddress: '0xe1A31a270082008ed2Ee736671CFb77144Bd532a', 
            to: '0x3a8eBfCcC377b09216586871be539aBFF9aB8ABf' // TODO: Pull from ethers; not MVP
        },
        file,
        nftMetadata: {
        description: 'My NFT description',
        traits: { 'my-custom-trait': 'my-custom-value' }
        }
    });
    console.log(`minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`);
    return nftInfo;
}