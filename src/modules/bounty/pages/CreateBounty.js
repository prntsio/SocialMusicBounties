import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Image, Stack } from "react-bootstrap";
import polylogo from "../../../images/polygon.png";
import { signedTypeData, getAddressFromSigner, splitSignature } from '../../../app/services/ethers-service';
import { createPostTypedData } from '../../../utils/create-post-typed-data';
import { lensHub } from '../../../utils/lens-hub';
import { getAddress } from '../../../app/services/ethers-service'
import { getProfiles } from '../../../app/services/LensQueries'
//import { pinFileToIPFS, pinataApiKey, pinataSecretApiKey } from "../../../utils/pinata-ipfs";
import {addToIPFS} from '../../../utils/ipfs'

export const createPost = async () => {
    console.log("Create POSt");
    
    let address = await getAddress()
    
    let profiles = await getProfiles({ ownedBy: address })
    let id = profiles.data.profiles.items[0].id
    console.log('Addr:', address);
    console.log('profiles:', profiles);
    console.log('ID', id);

  // hard coded to make the code example clear
  const createPostRequest = {
    profileId: id,
    contentURI: "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl.json",
    collectModule: {
        freeCollectModule:  {
            followerOnly: false
         }
    },
    referenceModule: {
        followerOnlyReferenceModule: false
    }
  };
        
  const result = await createPostTypedData(createPostRequest);
  const typedData = result.data.createPostTypedData.typedData;
  
  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  const { v, r, s } = splitSignature(signature);
  
  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI:typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log(tx.hash);
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here: 
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
}

const CreateBounty: React.FC<Props> = (props: Props) => {
    const [title, setTitle] = useState("");
    const [bountyType, setBountyType] = useState();
    const [file, setFile] = useState();
    const [hash, setHash] = useState();
    const [contributers, setContributers] = useState();
    const [requirementSpotify, setRequirementsSpotify] = useState();
    const [requirementsIG, setRequirementsIG] = useState();
    const [email, setEmail] = useState();
    const [bountyDescription, setBountyDescription] = useState();
    const [estimatedTime, setEstimatedTime] = useState();
    const [featureBounty, setFeatureBounty] = useState();
    const [bountyPrice, setBountyPrice] = useState();
    const [paymentDue, setPaymentDue] = useState();
    
    const handleSubmit = async () => {
        // console.log(
        //     "title", title,
        //     "file", file,
        //     "bountyType", bountyType,
        //     "contributers", contributers,
        //     "requirementSpotify", requirementSpotify,
        //     "requirementsIG", requirementsIG,
        //     "email", email,
        //     "bountyDescription", bountyDescription,
        //     "estimatedTime", estimatedTime,
        //     "featureBounty", featureBounty,
        //     "bountyPrice", bountyPrice,
        //     "paymentDue", paymentDue,
        // );
        await addToIPFS(file).then(console.log) //TODO: mapping fileHash to post and writing to contract to issueAndContribute
        createPost();

    }

    return (
        <Container className="justify-content-md-center w-50 mt-5">
          <button onClick={async () => {
            //const res = pinFileToIPFS('./lens-hub.js', pinataApiKey, pinataSecretApiKey)
            //console.log(res.data.IpfsHash)
          }}></button>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Bounty Title:
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
                    </Col>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={3}>
                            Bounty Type:
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Check
                                type="radio"
                                value="Feature"
                                label="Feature"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                onChange={(e) => setBountyType(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Remix"
                                value="Remix"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                onChange={(e) => setBountyType(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Beat"
                                value="Beat"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                onChange={(e) => setBountyType(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={3}>File</Form.Label>
                    <Col>
                        <Form.Control
                            type="file"
                            required
                            name="file"
                            onChange={(e) => {
                              setFile(e.target.files[0])
                              console.log(e.target.files[0])
                            }}
                        />
                    </Col>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={3}>
                            Contributers:
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Check
                                type="radio"
                                label="Traditional one contributer"
                                value="Traditional one contributer"
                                name="contributers"
                                id="formHorizontalRadios1"
                                onChange={(e) => setContributers(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Multiple people can contribute to this bounty"
                                value="Multiple people can contribute to this bounty"
                                name="contributers"
                                id="formHorizontalRadios2"
                                onChange={(e) => setContributers(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Requirements:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Spotify Plays..." onChange={(e) => setRequirementsSpotify(e.target.value)} />
                    </Col>
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Instagram followers..." onChange={(e) => setRequirementsIG(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Email:
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Bounty Description:
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as="textarea"
                            placeholder="Bounty Description"
                            style={{ height: '100px' }}
                            onChange={(e) => setBountyDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Estimated Time:
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control className="align-items-end" type="number" placeholder="Time in hours..." onChange={(e) => setEstimatedTime(e.target.value)} />
                    </Col>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={3}>
                            Feature Bounty:
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Check
                                type="radio"
                                label="Yes"
                                value="Yes"
                                name="feature"
                                id="formHorizontalRadios1"
                                onChange={(e) => setFeatureBounty(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                value="No"
                                name="feature"
                                id="formHorizontalRadios2"
                                onChange={(e) => setFeatureBounty(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Bounty Price:
                    </Form.Label>
                    <Col sm={5}>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Control className="align-items-end" type="number" placeholder="Price in Matic..." onChange={(e) => setBountyPrice(e.target.value)} /> <Image src={polylogo} />
                        </Stack>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Payment Due:
                    </Form.Label>
                    <Col sm={5}>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Control className="align-items-end" type="number" placeholder="Price in Matic..." onChange={(e) => setPaymentDue(e.target.value)} /> <Image src={polylogo} />
                        </Stack>
                    </Col>
                </Form.Group>


                <Container>
                    <Form.Group as={Row} className="justify-content-end mb-3">
                        <Col sm={{ span: 4 }}>
                            <Button onClick={() => handleSubmit()} type="submit">Create Bounty</Button>
                        </Col>
                    </Form.Group>
                </Container>
            </Form>
        </Container>
    )

};


export default CreateBounty;
