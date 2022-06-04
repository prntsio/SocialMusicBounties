import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../dashboard/components/Cards";
import UserInfo from "../components/UserInfo";
import BountyCards from "../../dashboard/components/Cards";
import React, { useEffect, useState, Dispatch, SetStateAction, } from "react";
import { bounties as getBounties } from '../../../repositories/list-user-bounties'
import { Bounty } from '../../../repositories/list-bounties'
import { useAccount } from 'wagmi'

interface Props { }


const Profile: React.FC<Props> = (props: Props) => {
  const [bounties, setbounties] = useState<Bounty[]>([]);
  const { data } = useAccount()

  useEffect(() => {
    (async () => {
      if (data) {
        const bounties = await getBounties(data.address);
        setbounties(bounties);
      }
    })()
  }, [])


  return (
    <Container>
      <Row>
        <Col xs={3}>
          <UserInfo />
        </Col>
        <Col xs={9}>
          <Cards width={100} bounties={[]} music={[]} />
        </Col>
      </Row>
      <BountyCards width={50}  bounties={bounties} music={[]}/>
    </Container>
  );
};

export default Profile;
