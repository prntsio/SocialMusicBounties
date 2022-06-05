import React, { useEffect, useState } from "react";
import { Button, Card, Container, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import polylogo from "../../../images/polygon.png";
import { Bounty } from "../../../repositories/list-bounties";
import { getVideoURL, MusicNFT } from "../../../repositories/list-music-NFT";
import { formatDistance } from "date-fns";
import { getFromIPFS } from "../../../utils/ipfs";
interface Props {
  width: number;
  bounties: Bounty[];
  music: MusicNFT[];
}

const BountyCards: React.FC<Props> = (props) => {
  const [processedMusic, setProcessedMusic] = useState<any>();
  let w = "";
  if (props.width === 100) {
    w = "justify-content-md-center my-5";
  } else {
    w = "justify-content-md-center w-50 my-5";
  }
  useEffect(() => {
    const fetchIPFSArray = async () => {
      const f = props.music.map<any>(async m => {
        const mJson = JSON.parse(await getFromIPFS(m.tokenURI.replace("ipfs://", "")))
        return {...m, hash2: mJson.properties.video.replace("ipfs://",""),name: mJson.name}
      })
     
      return Promise.all(f).then(pmusic => {
        console.log(pmusic)
        setProcessedMusic(pmusic)
      })
    }
    if (!props.music) return;
    fetchIPFSArray()
  }, [props.music])

  return (
    <>
      {processedMusic && processedMusic.map((m : any) => <Container key={m.id} className={w}>
              <Card>
                <Card.Header>
                  <Card.Title>{m.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div style={{marginBottom: 20}}>
                    
                    <span >{"Submitted by"}{" "}</span>
                    <span style={{ color: "#11BB99" }}>{m.sender}</span>
                   
                  </div>

                  
                  <div style={{margin: 'auto'}}>
                    
                    <iframe
                    style={{
                      
                      display:'block',
                      margin: 'auto',
                      height: 720/2,
                      width: 1280/2,
                      
                    }}
                    src={("https://ipfs.io/ipfs/" + m.hash2) || "https://ipfs.io/ipfs/bafybeicqizo3dfwy7smo6xz57ryfu57vam52eki5ai6sgfusfmqpyg4ddy"}
                    allow="autoplay; encrypted-media; picture-in-picture"
                  // sandbox="allow-scripts"
                    />
                    
                  </div>
              <Card.Text>
                    {formatDistance(
                      new Date(),
                      new Date(Number(m.createdAt) * 1000)
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>)}
      {props.bounties.map((bounty) => (
        <Container key={bounty.id} className={w}>
          <Card>
            <Card.Header>
              {"Owned by"}{" "}
              <text style={{ color: "#11BB99" }}>{bounty.sender}</text>
            </Card.Header>
            <Card.Body>
              <Card.Title>{bounty.title}</Card.Title>
              <Card.Text>{bounty.description}</Card.Text>
              <Stack
                className="justify-content-end"
                direction="horizontal"
                gap={3}
              >
                <Card.Text className="mt-3">
                  {" "}
                  <Image src={polylogo} /> {bounty.bountyPrice}{" "}
                </Card.Text>
                <Link to={"/post/" + bounty.bountyId}>
                  <Button variant="primary">View</Button>
                </Link>
              </Stack>
              <Card.Text>
                {formatDistance(
                  new Date(),
                  new Date(Number(bounty.createdAt) * 1000)
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      ))}
    </>
  );
};
export {};
export default BountyCards;
