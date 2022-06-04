import React, { Dispatch, SetStateAction, useState } from "react";
import logo from "../../images/Logo.svg";
import { Button, Container,  Navbar, Stack } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { authLens } from '../../modules/auth/services/Auth'

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
interface Props {}

function Profile() {
  const { data: account } = useAccount()
  const { connect, connectors, error, isConnecting, pendingConnector } =
  useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address: account?.address })

  if (account) {
    return (
      <div>
        
        <Link to="/profile">
        <div>
          {ensName ? `${ensName} (${account.address})` : account.address}
        </div>
        </Link>
        <button onClick={() => disconnect}>Disconnect</button>
      </div>
    )
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
          {!connector.ready && ' (unsupported)'}
          {isConnecting &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  )
}


const Header: React.FC<Props> = () => {
    const renderContainer = () => (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/" style={{textDecoration:'none'}}>
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={logo}
                                width="80"
                                height="50"
                                className="d-inline-block"
                                style={{
                                  padding: 5
                                }}
                            />{' '}
                            Bounties
                        </Navbar.Brand>
                    </Link>
                    <Profile />

                </Container>
            </Navbar>
        </>
    );

    return renderContainer();
};

export default Header;


