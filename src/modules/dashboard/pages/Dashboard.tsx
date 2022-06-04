import BountyCards from "../components/Cards";
import PageTop from "../components/PageTop";
import { useContractRead, useContractWrite } from "wagmi";
import config from "../../../config/config";
import bountyContract from '../../../abis/TestContract.json'
import { ethers } from "ethers";
import { bounties as getBounties, Bounty } from '../../../repositories/list-bounties'
import React, { useEffect, useState, Dispatch, SetStateAction, } from "react";
import { toast } from 'react-toastify';
interface Props {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Dashboard: React.FC<Props> = () => {
  const bountyId = 26
  const [bounties, setbounties] = useState<Bounty[]>([]);

  const { data, isError, isLoading } = useContractRead({
        addressOrName: config.address,
        contractInterface: bountyContract,
      },
      "getBounty",
      {
        args: [bountyId],
        chainId: config.chainId
      },
    )
      useEffect(() => {if (data) console.log(data)}, [data])

    const sender = "0x7cACbc75d74740b50Dc68fBF0a573Af80243ca56"
    const applicant = "0xE9125C6006D650CdcD4E223aC93295523571397e"

    const {write : issueAndContribute, data: issueAndContributeData} = useContractWrite({
      addressOrName: config.address,
      contractInterface: bountyContract,
    },
      "issueAndContribute",
      {
        args: [sender,[sender],[sender],JSON.stringify({
          title: 'Brazilian Musicv2', 
          type: 'Feature', 
          nftHash: 'fakeHash', 
          contributersType: 'one', 
          spotifyPlays: 10000, 
          instagramFollowers: 100, 
          email: 'kebab@gmail.com', 
          description :'I need Brazilian music for my voices.', 
          estimatedTime:100, 
          bountyPrice: 100, //bountyPrice doesn't
          paymentDue: 1
        }),2528821098,"0x0000000000000000000000000000000000000000",0,ethers.utils.parseEther("0.1")],
        overrides: {
          value: ethers.utils.parseEther("0.1")
        }
        // chainId: config.chainId
      },
    )
    // applicant notifies sender that they are available
    const {write : performAction, data: performActionData} = useContractWrite({
      addressOrName: config.address,
      contractInterface: bountyContract,
    },
      "performAction",
      {
        args: [applicant,bountyId,JSON.stringify({mode: 'addFulfiller', fulfillerToAdd: applicant})],
        // chainId: config.chainId
      },
    )
    //performAction to choose applicant
    const {write : setFinalFulfiller, data: setFinalFulfillerData} = useContractWrite({
      addressOrName: config.address,
      contractInterface: bountyContract,
    },
      "performAction",
      {
        args: [sender,bountyId,JSON.stringify({mode: 'setfinalFulfiller', finalFulfiller: applicant})],
        // chainId: config.chainId
      },
    )

    const {write : fulfillBounty, data: fulfillBountyData} = useContractWrite({
      addressOrName: config.address,
      contractInterface: bountyContract,
    },
      "fulfillBounty",
      {
        args: [applicant,bountyId,[applicant],"data"],
        // chainId: config.chainId
      },
    )
    const {write : acceptFulfillment, data: acceptFulfillmentData, error} = useContractWrite({
      addressOrName: config.address,
      contractInterface: bountyContract,
    },
      "acceptFulfillment",
      {
        args: [sender,bountyId,0,0,[ethers.utils.parseEther("0.1")]], //TODO - doesn't do 1 to 1 bounty
        // chainId: config.chainId
      },
    )
    useEffect(() => {
      (async () => {
        const bounties = await getBounties();
        setbounties(bounties);
      })()
    }, [])
    useEffect(() => {
      const provider = (window as any).ethereum
      if (!provider) {
        alert("Metamask is not installed, please install!")
      } else {
        const chainId = provider.request({ method: "eth_chainId" });
        const testChainId = '0x13881'
        if (chainId !== testChainId) {
          try {
            provider.request({method: 'wallet_switchEthereumChain', params: [{ chainId: testChainId}]});
          } catch (switchError) {
            toast.dismiss()
            toast.error("Failed to switch to the network");
          }
        }
      }
    }, [])
    
    return (
        <>
            <PageTop />
            <button onClick={() => issueAndContribute()}> issueAndContribute</button>
            <button onClick={() => performAction()}> performAction</button>
            <button onClick={() => fulfillBounty()}> fulfillBounty</button>
            <button onClick={() => acceptFulfillment()}> acceptFulfillment</button>
            <BountyCards width={50}  bounties={bounties}/>
        </>

    );
};

export default Dashboard;
