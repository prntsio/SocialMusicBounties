import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
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
import { mintNft, upload } from "../../../utils/livepeer";
import { formatDistance, format } from "date-fns"
import { toast } from "react-toastify";
import axios from "axios";
import { fulfillment } from "../../../repositories/get-fulfillment";

interface Props { }

const Post: React.FC<Props> = (props: Props) => {
  const { id : bountyId } = useParams();
  const [bounty, setBounty] = useState<Bounty>();
  const [performedActions, setPerformedActions] = useState<PerformedAction[]>();
  const [finalFulfiller1, setFinalFulfiller1] = useState<string>();
  const [loaded, setLoaded] = useState(false)
  const [nftHash, setNftHash] = useState<string>('');
  const { data: account} = useAccount();
  const sender = bounty && bounty.sender || '';
  const isOwner = (account && account.address?.toLowerCase()) === (bounty && bounty.sender.toLowerCase())
  const isCompletePayment = bounty && bounty.nftHash
  const [video, setVideo] = useState<string>('');
  const [isFulfilled, setIsFulfilled] = useState<boolean>(false);
  useEffect(() => {
    if (!(bounty && bounty.nftHash)) return;
    axios.get(bounty?.nftHash).then(res => {
      setVideo(res.data.external_url)
    })
  }, [isCompletePayment])
  useEffect(() => {
    (async () => {
      if (bountyId) {
        const bounty = await getBounty(bountyId);
        const performedActions = await getPerformedActions(bountyId)
        const f = performedActions.filter(a => a.mode == 'setfinalFulfiller')
        // console.log(bounty)
        setPerformedActions(performedActions.filter(a => a.mode))
        if (f.length === 0) {
        } else if (f[0]){
          const a : any = f[0]
          setFinalFulfiller1(a.finalFulfiller)
          const res = await fulfillment(bountyId);
          console.log(res)
          if(res) {
            setIsFulfilled(res.id)
          } 
        }
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
            <p>{format(new Date(Number(bounty.createdAt) * 1000), "MM/dd/yyyy HH:mm")}</p>
          </Col>
          <Col>
            <p style={{color: "#687684"}}>Number of Applicants</p>
            <p>{performedActions?.filter(a => a.mode == 'addFulfiller').length}</p>
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
        <div> <> 
          {/* TODO: map actions with mode of setfinalFulfiller */}
            {!finalFulfiller1 && !isFulfilled && <Button variant="primary" onClick={() => {
              addFulfiller({
                args: [account.address,bountyId,JSON.stringify({mode: 'addFulfiller', fulfillerToAdd: account.address})],
              })
          }}>Apply</Button>}
          
          </> 
          {/* {console.log(<bounty className="nftHash"></bounty>)} */}
          { !isCompletePayment ?
          <p >You can complete payment when the approved applicant has submitted the work</p> : <>
            <div style={{margin: 'auto'}}>
              <hr></hr>
              <h4>Submitted Work</h4>
              <iframe
              style={{
                
                display:'block',
                margin: '50',
                height: 720/2,
                width: '100%',
                marginBottom: 25
                
              }}
              src={video || "https://ipfs.io/ipfs/bafybeicqizo3dfwy7smo6xz57ryfu57vam52eki5ai6sgfusfmqpyg4ddy"}
              allow="autoplay; encrypted-media; picture-in-picture"
            // sandbox="allow-scripts"
           
              />
              
            </div>
          </>
        }
            {account.address?.toLowerCase() == finalFulfiller1?.toLowerCase() && <Form.Control
                      type="file"
                      required
                      name="file"
                      onChange={async (e : any) => {
                        const file = e.target.files[0]
                        // upload(file)
                        try {
                          toast.loading('Minting NFT...')
                          const res : any = await mintNft(file)
                          console.log(res)
                          if (res && res.nftMetadataGatewayUrl) {
                            toast.dismiss()
                            toast.success('NFT minted! Submit your work.')
                            setNftHash(res.nftMetadataGatewayUrl)
                          }
                          // setNftHash()
                        } catch (e) {
                          console.error(e)
                        }
                      }}
                      style={{marginBottom: 25}}
                  />}
          {!isFulfilled && <Button variant="primary" disabled={account.address?.toLowerCase() != finalFulfiller1?.toLowerCase()} style={{marginLeft: 25}} onClick={() => {
              if (!nftHash) {
                toast.error('Please upload a mp4 file')
                return;
              }

              fulfillBounty({args: [account.address,bountyId,[account.address],nftHash]})
            }}>Submit Work</Button>}
          {isOwner && !isFulfilled && <Button variant="primary" disabled={!isCompletePayment} style={{marginLeft: 25}} onClick={() => {
            acceptFulfillment({args: [sender,bountyId,0,0,[ethers.utils.parseEther(bounty.bountyPrice)]]})
          }}>Complete Payment</Button>}
          {isFulfilled && <div>This Bounty is fulfilled.</div>}
        </div>
        <p style={{marginTop: 20}}></p>
        {bounty.finalFulfiller && <>
              <div>Data to be uploaded</div>
            </>}
        {/* { account != bounty.finalFulfiller ?
          <p >Awaiting person that made bounty to choose an applicant, maybe show list of applicants here</p> : <>
            <p>Show the approved applicant here</p>
          </>
        } */}
      </div>
      <p><hr/></p>
      <h4>History</h4>
      {performedActions && performedActions.map(action => {
        if (action.mode == 'addFulfiller'){
          return <div style={{
            marginBottom: 25
          }}>
            <span style={{color: "#11BB99"}}>{action.fulfiller}</span> <span>{"applied for this bounty. "}{formatDistance(new Date(), new Date(Number(action.createdAt) * 1000))}</span>
            { isOwner && !finalFulfiller1 && <> 
              <Button variant="primary" style={{marginLeft: 25}} onClick={() => {
                
                setFinalFulfiller({
                  args: [sender,bountyId,JSON.stringify({mode: 'setfinalFulfiller', finalFulfiller: account.address})],
                  // chainId: config.chainId
                })
                throw 'Not Implemented'
              }} >Approve</Button>
            </>}
          </div>
        } else if (action.mode == 'setfinalFulfiller') {
          return <div style={{
            marginBottom: 25
          }}>
            {"Owner has choosen "}<span style={{color: "#11BB99"}}>{action.fulfiller}</span> <span>{"to fulfill the bounty. "}{formatDistance(new Date(), new Date(Number(action.createdAt) * 1000))}</span>
          </div>
        }
        
      })}
      </>}

    </ Container>
  );
};

export default Post;
