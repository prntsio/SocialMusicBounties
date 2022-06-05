import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import polylogo from "../../../images/polygon.png";
import Loading from "../../../shared/Loading";
import { bounty as getBounty } from '../../../repositories/get-bounty'
import { Bounty } from "../../../repositories/list-bounties";
import { performedActions as getPerformedActions } from '../../../repositories/list-bounty-performed-actions'
import { PerformedAction } from '../../../repositories/list-performed-actions'
import { useAccount, useContractWrite } from "wagmi";
import config from '../../../config/config'
import bountyContract from '../../../abis/TestContract.json'
import { ethers } from "ethers";
import { mintNft } from "../../../utils/livepeer";

interface Props { }

const Post: React.FC<Props> = (props: Props) => {
  const { id : bountyId } = useParams();
  const [bounty, setBounty] = useState<Bounty>();
  const [performedActions, setPerformedActions] = useState<PerformedAction[]>();
  const [loaded, setLoaded] = useState(false)
  const { data: account} = useAccount();
  const sender = bounty && bounty.sender || '';
  const isOwner = (account && account.address?.toLowerCase()) == (bounty && bounty.sender.toLowerCase())
  const isCompletePayment = false
  console.log(isOwner)
  console.log(account)
  console.log(bounty && bounty.id)
  console.log(bounty && bounty.id == (account && account.address))
  useEffect(() => {
    (async () => {
      if (bountyId) {
        const bounty = await getBounty(bountyId);
        const performedActions = await getPerformedActions(bountyId)
        setPerformedActions(performedActions)
        setBounty(bounty)
        setLoaded(true)
      }
    })()
  }, [bountyId])

  const {write : addFulfiller, data: addFulfillerData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "performAction",
    {
      args: [account && account.address,bountyId,JSON.stringify({mode: 'addFulfiller', fulfillerToAdd: account && account.address})],
      // chainId: config.chainId
    },
  )
  //performAction to choose applicant
  const {write : setFinalFulfiller, data: setFinalFulfillerData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "performAction",
  )

  const {write : fulfillBounty, data: fulfillBountyData} = useContractWrite({
    addressOrName: config.address,
    contractInterface: bountyContract,
  },
    "fulfillBounty",
    {
      args: [account,bountyId,[account],"data"],
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

  if (!loaded) return <Loading />
  if (!account) return <div>Please connect an account</div>
  return (
    <Container>
      {bounty && <>
      <p></p>
      <h1>{bounty.title}</h1>
      <p>Owned By <span style={{color: "#11BB99"}}>{isOwner ? "you" : bounty.sender}</span></p>
      <div style={{paddingLeft: 50}}>
      <Row>
          <Col>
            <p style={{color: "#687684"}}>Bounty Created</p>
            <p>Block: {bounty.createdAt}</p>
          </Col>
          <Col>
            <p style={{color: "#687684"}}>Number of Applicants</p>
            <p>2</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{color: "#687684"}}>Current Bounty Reward</p>
            <p> <Image src={polylogo} /> {bounty.bountyPrice}</p>
          </Col>
          <Col>
            <p style={{color: "#687684"}}>Bounty Description</p>
            <p>{bounty.description}</p>
          </Col>
        </Row>
        <div>
          {isOwner && <> 
          {/* TODO: map actions with mode of setfinalFulfiller */}
            <Button variant="primary" onClick={() => {
              setFinalFulfiller({
                args: [sender,bountyId,JSON.stringify({mode: 'setfinalFulfiller', finalFulfiller: account})],
                // chainId: config.chainId
              })
            throw 'Not Implemented'
          }}>Approve</Button>
          
          </> }
          
          { <>
            <Button variant="primary" style={{marginLeft: 25}} onClick={() => {
              const f = JSON.stringify({mode: 'addFulfiller', fulfillerToAdd: account.address})
              addFulfiller({
                args: [account.address,bountyId,"asdf"],
              })
            }} >Apply</Button>
            <Button variant="primary" disabled={account != bounty.finalFulfiller} style={{marginLeft: 25}} onClick={() => {
              acceptFulfillment({args: [account,bountyId,[account],"data"]})
            }}>Submit Work</Button>
          </>}
          {isOwner && <Button variant="primary" disabled={!isCompletePayment} style={{marginLeft: 25}} onClick={() => {
            throw 'Not Implemented'
          }}>Complete Payment</Button>}
        </div>
        <p style={{marginTop: 20}}></p>
        {bounty.finalFulfiller && <>
              <div>Data to be uploaded here</div>
            </>}
        { !isCompletePayment ?
          <p >You can complete payment when the approved applicant has submitted the work</p> : <>
            Applicant's submitted demo here
          </>
        }

        { account != bounty.finalFulfiller ?
          <p >Awaiting person that made bounty to choose an applicant, maybe show list of applicants here</p> : <>
            <p>Show the approved applicant here</p>
          </>
        }
      </div>
      </>}
      {performedActions && performedActions.map(a => {
        console.log(a)
        return <div> a </div> 
      })}
      <button onClick={() => mintNft()}>mintNft</button>
    </ Container>
  );
};

export default Post;
