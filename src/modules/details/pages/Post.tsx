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

interface Props { }

const Post: React.FC<Props> = (props: Props) => {
  const { id : bountyId } = useParams();
  const [bounty, setBounty] = useState<Bounty>();
  const [performedActions, setPerformedActions] = useState<PerformedAction[]>();
  const [loaded, setLoaded] = useState(false)
  const { data: account} = useAccount();
  const sender = bounty && bounty.sender || '';
  const isOwner = sender == account
  const isCompletePayment = false
 const applicant = account

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

  if (!loaded) return <Loading />
  if (!account) return <div>Please connect an account</div>
  return (
    <Container>
      {bounty && <>
      <p></p>
      <h1>{bounty.title}</h1>
      <p>Owned By <span style={{color: "#11BB99"}}>{bounty.sender}</span></p>
      <div style={{paddingLeft: 50}}>
      <Row>
          <Col>
            <p style={{color: "#687684"}}>Bounty Created DATE HERE</p>
            <p></p>
          </Col>
          <Col>
            <p style={{color: "#687684"}}>Number of Applicants</p>
            <p>2</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{color: "#687684"}}>Current Price</p>
            <p> <Image src={polylogo} /> {bounty.bountyPrice}</p>
          </Col>
          <Col>
            <p style={{color: "#687684"}}>Bounty Description</p>
            <p>{bounty.description}</p>
          </Col>
        </Row>
        {isOwner && <> 
        {/* TODO: map actions with mode of setfinalFulfiller */}
          <Button variant="primary" onClick={() => {
            setFinalFulfiller({
              args: [sender,bountyId,JSON.stringify({mode: 'setfinalFulfiller', finalFulfiller: account})],
              // chainId: config.chainId
            })
          throw 'Not Implemented'
        }}>Approve</Button>
        <Button variant="primary" disabled={!isCompletePayment} style={{marginLeft: 25}} onClick={() => {
          throw 'Not Implemented'
        }}>Complete Payment</Button>
        </> }{ <>
          <Button variant="primary" onClick={() => {
            addFulfiller({
              args: [account,bountyId,JSON.stringify({mode: 'addFulfiller', fulfillerToAdd: account})],
            })
            throw 'Not Implemented'
          }}>Apply</Button>
          {bounty.finalFulfiller && <>
            <div>Data to be uploaded here</div>
          </>}
          <Button variant="primary" disabled={account != bounty.finalFulfiller} style={{marginLeft: 25}} onClick={() => {
            acceptFulfillment({args: [applicant,bountyId,[applicant],"data"]})
          }}>Submit Work</Button>
        </>}
        <p style={{marginTop: 20}}></p>
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
    </ Container>
  );
};

export default Post;
