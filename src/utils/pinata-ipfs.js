//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const pinataApiKey = "0cebccd8d88e5e707aa4"
const pinataSecretApiKey = "a5786d4258dfc914e1a01dd363c3e5d0db10394d94740baee05ba20024d09550"

const pinFileToIPFS = (file, pinataApiKey, pinataSecretApiKey) => {
    // console.log(file)
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    console.log(fs.createReadStream('./lens-hub.js'))
    data.append('file', fs.createReadStream('./lens-hub.js'));
    console.log(data)
    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
};

pinFileToIPFS("", pinataApiKey, pinataSecretApiKey)
// pinata API key: 0cebccd8d88e5e707aa4
// pinata API secret: a5786d4258dfc914e1a01dd363c3e5d0db10394d94740baee05ba20024d09550
// pinata JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNmFkMTliNi0yODgzLTQ1NzItOWU0Mi1mNWVlMWZhYzM2ZDciLCJlbWFpbCI6IjB4dGhyZXNoQHByb3Rvbm1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjBjZWJjY2Q4ZDg4ZTVlNzA3YWE0Iiwic2NvcGVkS2V5U2VjcmV0IjoiYTU3ODZkNDI1OGRmYzkxNGUxYTAxZGQzNjNjM2U1ZDBkYjEwMzk0ZDk0NzQwYmFlZTA1YmEyMDAyNGQwOTU1MCIsImlhdCI6MTY1NDI5MzMxNX0.MnhEBozdUBXITmAjax3oFRTInxJaX-i2q6gFQv50wds