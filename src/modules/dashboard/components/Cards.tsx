import React from "react";
import { Button, Card, Container, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import polylogo from "../../../images/polygon.png";
import { Bounty } from '../../../repositories/list-bounties'
import { MusicNFT } from "../../../repositories/list-music-NFT";
import { formatDistance, format } from "date-fns"
interface Props {
    width: number;
    bounties: Bounty[];
    music: MusicNFT[];
}

const BountyCards: React.FC<Props> = (props) => {
    let w = ""
    if(props.width === 100){
        w ="justify-content-md-center my-5"
    }
    else {
        w = "justify-content-md-center w-50 my-5"
    }


    return (
        <>
            {props.music.map(music => <div key={music.id}>tokenURI: {music.tokenURI}</div>)}
            {props.bounties.map(bounty =>
                <Container key={bounty.id} className={w}>
                    <Card>
                        <Card.Header>{"Owned by"} {bounty.sender}</Card.Header>
                        <Card.Body>
                            <Card.Title>{bounty.title}</Card.Title>
                            <Card.Text>
                                {bounty.description}
                            </Card.Text>
                            <Stack className="justify-content-end" direction="horizontal" gap={3}>
                                <Card.Text className="mt-3"> <Image src={polylogo} /> {bounty.bountyPrice} </Card.Text>
                                <Link to={'/post/' + bounty.bountyId} >
                                    <Button variant="primary">View</Button>
                                </Link>
                            </Stack>
                            <Card.Text>
                                {formatDistance(new Date(), new Date(Number(bounty.createdAt) * 1000))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            )}
        </>

    );
};
export { };
export default BountyCards;

