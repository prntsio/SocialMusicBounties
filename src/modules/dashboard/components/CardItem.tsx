import React, { useEffect, useState } from "react";
import { Button, Card, Container, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import polylogo from "../../../images/polygon.png";
import { Bounty } from "../../../repositories/list-bounties";
import { formatDistance } from "date-fns";
import { getProfile, Profile } from "../../../repositories/get-profiles";
import lensLogo from "../../../images/LensProtocol_logo.jpeg";

interface Props {
  bounty: Bounty;
  w: string;
}

const BountyCardItem: React.FC<Props> = (props) => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    (async () => {
      const profile = await getProfile(props.bounty.sender);
      setProfile(profile);
    })();
  }, []);

  return (
    <>
      <Container key={props.bounty.id} className={props.w}>
        <Card>
          <Card.Header>
            {profile && (
              <div>
                <img
                  alt=""
                  src={profile?.picture || lensLogo}
                  width="35"
                  height="35"
                  className="d-inline-block"
                  style={{
                    borderRadius: 50 / 2,
                    padding: 5,
                  }}
                />
                {profile?.handle}
              </div>
            )}
            {"Owned by"}{" "}
            <span style={{ color: "#11BB99" }}>{props.bounty.sender}</span>
          </Card.Header>
          <Card.Body>
            <Card.Title>{props.bounty.title}</Card.Title>
            <Card.Text>{props.bounty.description}</Card.Text>
            <Stack
              className="justify-content-end"
              direction="horizontal"
              gap={3}
            >
              <Card.Text className="mt-3">
                {" "}
                <Image src={polylogo} /> {props.bounty.bountyPrice}{" "}
              </Card.Text>
              <Link to={"/post/" + props.bounty.bountyId}>
                <Button variant="primary">View</Button>
              </Link>
            </Stack>
            <Card.Text>
              {formatDistance(
                new Date(),
                new Date(Number(props.bounty.createdAt) * 1000)
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default BountyCardItem;
