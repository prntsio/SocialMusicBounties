import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import logo from "../../images/Logo.svg";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import lensLogo from "../../images/LensProtocol_logo.jpeg";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { getProfile, Profile } from "../../repositories/get-profiles";
interface Props {}

function ProfileComponent() {
  const { data: account } = useAccount();
  const [profile, setProfile] = useState<Profile>();
  const {
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: account?.address });
  useEffect(() => {
    (async () => {
      if (account) {
        const profile = await getProfile(account.address!);
        setProfile(profile);
      }
    })();
  }, []);

  if (account) {
    return (
      <div>
        {profile && (
          <div>
            <img
              alt=""
              src={profile?.picture || lensLogo}
              width="50"
              height="50"
              className="d-inline-block"
              style={{
                borderRadius: 50 /2,
                padding: 5,
              }}
            />
            {profile?.handle}
          </div>
        )}
        <Link to="/profile">
          <div>
            {ensName ? `${ensName} (${account.address})` : account.address}
          </div>
        </Link>
        <button onClick={() => disconnect}>Disconnect</button>
      </div>
    );
  }
  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isConnecting &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  );
}

const Header: React.FC<Props> = () => {
  const renderContainer = () => (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="80"
                height="50"
                className="d-inline-block"
                style={{
                  padding: 5,
                }}
              />{" "}
              <text
                fontSize="50px"
                style={{ fontWeight: "bold" }}
                fontFamily="serif"
              >
                PRNTS BOUNTIES
              </text>
            </Navbar.Brand>
          </Link>
          <ProfileComponent />
        </Container>
      </Navbar>
    </>
  );

  return renderContainer();
};

export default Header;
