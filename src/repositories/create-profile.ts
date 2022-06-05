import { gql } from "@apollo/client"
import { apolloClient } from "../app/services/ApolloClient"

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (createProfileRequest: {
  handle: string;
  profilePictureUri?: string;
  followNFTURI?: string;
}) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

export const createProfile = async (address: string, handle: string) => {
  console.log('create profile: address', address);

  const createProfileResult = await createProfileRequest({
    handle: handle,
  });

  return createProfileResult;
};