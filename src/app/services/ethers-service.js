import {ethers, utils} from 'ethers'
import omitDeep from 'omit-deep';

export const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = ethersProvider.getSigner()

export const getAddress = async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
  
}

export const signText = (text) => {
  console.log("hit provider:", signer);
  return signer.signMessage(text);
}


export const getSigner = () => {
    return ethersProvider.getSigner();
}

export const getAddressFromSigner = () => {
  return getSigner().address;
}

export const init = async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

export const signedTypeData = (domain, types, value) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename')
  );
}

export const splitSignature = (signature) => {
    return utils.splitSignature(signature)
}

export const sendTx = (transaction) => {
  const signer = ethersProvider.getSigner();
  return signer.sendTransaction(transaction);
}
