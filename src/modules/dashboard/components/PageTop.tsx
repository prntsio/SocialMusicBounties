import React from "react";
import { Button, Card, Col, Container, Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
interface Props {
}


const BountyCards: React.FC<Props> = () => {
    return (
        <>

            <Container className="w-50 my-5">
                <Card>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col sm={9}>
                                    <Card.Text   className="my-2">Timeline</Card.Text>
                                </Col>
                                <Col sm={3} className="justify-content-end">
                                    <Link  to="/create-bounty" >
                                        <Button >Create Bounty</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>



                    </Card.Body>

                </Card>
            </Container>
        </>

    );
};
export { };
export default BountyCards;

