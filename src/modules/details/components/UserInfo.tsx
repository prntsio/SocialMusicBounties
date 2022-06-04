import React, { } from "react";
import { Card, Container, Stack } from "react-bootstrap";
interface Props { }

const UserInfo: React.FC<Props> = (props: Props) => {

  return (
    <Container className="justify-content-md-center my-5">
      <Card>
        <Card.Header>John Doe @JohnnyD</Card.Header>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Card.Text>
            <ul>
              <li>Test</li>
              <li>bounty</li>
              <li>words</li>
            </ul>
          </Card.Text>
          <Stack className="justify-content-end" direction="horizontal" gap={3}>
            <Card.Text className="mt-3"> TEXT </Card.Text>

          </Stack>

        </Card.Body>
      </Card>
    </Container>
  )
}
export default UserInfo;
