import { apolloClient } from './ApolloClient';
import { gql } from '@apollo/client'
import { CREATE_POST_TYPED_DATA, GET_CHALLENGE, AUTHENTICATION, GET_PROFILES, CREATE_PROFILE } from '../../shared/constants';

export const createPostTypedData = (createPostTypedDataRequest) => {
    return apolloClient.mutate({
        mutation: gql(CREATE_POST_TYPED_DATA),
        variables: {
            request: createPostTypedDataRequest,
        },
    });
};

export const createProfile = (createProfileRequest) => {
  console.log("createProfile");
  return apolloClient.mutate({
      mutation: gql(CREATE_PROFILE),
      variables: {
          request: createProfileRequest,
      },
  })
};


export const authenticate = (address, signature) => {
   return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
}

export const generateChallenge = (address) => {
   return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
         address,
      },
    },
  })
}

export const getProfiles = (request) => {
  console.log("GetProfiles");
  return apolloClient.query({
  query: gql(GET_PROFILES),
  variables: {
      request
  },
    })
  }

