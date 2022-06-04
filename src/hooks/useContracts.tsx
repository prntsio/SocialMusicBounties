import config from "../config/config"
import bountyContract from '../abis/TestContract.json'
import { useContractWrite } from "wagmi"
import { ethers } from "ethers"


export const useContract = () => {

  const address = "0x7cACbc75d74740b50Dc68fBF0a573Af80243ca56"
  const {write : _issueBounty, data: issueBountyData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "issueBounty",
    {
      args: [address,[address],[address],JSON.stringify({text:'hello world'}),1654298633688,"0x0000000000000000000000000000000000000000",0],
      // chainId: config.chainId
    },
  )

  const issueBounty = () => {
    _issueBounty()
  }

  const {write : issueAndContribute, data: issueAndContributeData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "issueAndContribute",
    {
      args: [address,[address],[address],JSON.stringify({text:'hello world'}),1654298633688,"0x0000000000000000000000000000000000000000",0,ethers.utils.parseEther("0.001")],
      overrides: {
        value: ethers.utils.parseEther("0.001")
      }
      // chainId: config.chainId
    },
  )
  const bountyId = 8
  const {write : performAction, data: performActionData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "performAction",
    {
      args: [address,bountyId,JSON.stringify({text:'performAction is doing stuff'})],
      // chainId: config.chainId
    },
  )
  const {write : fulfillBounty, data: fulfillBountyData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "fulfillBounty",
    {
      args: [address,bountyId,[address],JSON.stringify({text:'fulfill bounty is called'})],
      // chainId: config.chainId
    },
  )
  const {write : acceptFulfillment, data: acceptFulfillmentData, error} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "acceptFulfillment",
    {
      args: [address,bountyId,0,0,[ethers.utils.parseEther("0.0001")]],
      // chainId: config.chainId
    },
  )
}
