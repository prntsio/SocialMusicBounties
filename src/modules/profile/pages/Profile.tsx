import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../dashboard/components/Cards";
import UserInfo from "../components/UserInfo";

interface Props { }

const Profile: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <UserInfo />
        </Col>
        <Col xs={9}>
          <Cards width={100} bounties={[]} />
        </Col>
      </Row>
    </Container>

  );
};

export default Profile;
