
import { generateChallenge, authenticate, createProfile } from "../../../app/services/LensQueries";
import { getAddress, signText } from "../../../app/services/ethers-service";
// import { pollUntilIndexed } from './poll-until-indexed';

export const createProfileRequest = (handle: string, pictureUri: string, followNFTURI: string) => {
    return {
        handle: handle,
        profilePictureUri: pictureUri,
        followNFTURI,
        followModule: null,
    };
};

export const createProfileLens = async (handle: string) => {
    console.log("createProfileLens");
    
    return createProfile({
        handle: handle,
        profilePictureUri:
            'https://prnts.mypinata.cloud/ipfs/QmUDKC6zKTfDh25yNceRXRodi3R8MZZ5fKJFgVkkKwTGHt',
        followNFTURI:
            'https://prnts.mypinata.cloud/ipfs/QmUDKC6zKTfDh25yNceRXRodi3R8MZZ5fKJFgVkkKwTGHt',
        followModule: {
            freeFollowModule: true,
        },
    });
    
};


export const authLens = async () => {
    // we grab the address of the connected wallet
    let connectedAccount = await getAddress();
    

    // we request a challenge from the server
    const challengeResponse = await generateChallenge(connectedAccount);

    // sign the text with the wallet
    const signature = await signText(challengeResponse.data.challenge.text)

    const tokens = await authenticate(connectedAccount, signature);

    localStorage.setItem('LENS_TOKEN', JSON.stringify(tokens.data.authenticate));
    console.log("accessTokens", tokens);

    return connectedAccount;
   
  }

