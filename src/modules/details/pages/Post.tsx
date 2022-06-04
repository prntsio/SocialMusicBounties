import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import polylogo from "../../../images/polygon.png";
import Loading from "../../../shared/Loading";
import { bounty as getBounty } from '../../../repositories/get-bounty'
import { Bounty } from "../../../repositories/list-bounties";

interface Props { }

const Post: React.FC<Props> = (props: Props) => {
  const { id } = useParams();
  const [bounty, setBounty] = useState<Bounty>();
  const [loaded, setLoaded] = useState(false)
  const isOwner = false
  const isApproved = false
  const isCompletePayment = false

  useEffect(() => {
    (async () => {
      if (id) {
        const bounty = await getBounty(id);
        console.log(bounty);
        setLoaded(true)
        setBounty(bounty)
      }
    })()
  }, [id])

  if (!loaded) return <Loading />
  
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
        {isOwner ? <>
          <Button variant="primary" onClick={() => {
          throw 'Not Implemented'
        }}>Approve</Button>
        <Button variant="primary" disabled={!isCompletePayment} style={{marginLeft: 25}} onClick={() => {
          throw 'Not Implemented'
        }}>Complete Payment</Button>
        </> : <>
          <Button variant="primary" onClick={() => {
            throw 'Not Implemented'
          }}>Apply</Button>
          <Button variant="primary" disabled={!isApproved} style={{marginLeft: 25}} onClick={() => {
            throw 'Not Implemented'
          }}>Submit Work</Button>
        </>}
        <p style={{marginTop: 20}}></p>
        { !isCompletePayment ?
          <p >You can complete payment when the approved applicant has submitted the work</p> : <>
            Applicant's submitted demo here
          </>
        }

        { !isApproved ?
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
