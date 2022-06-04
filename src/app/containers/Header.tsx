import React, { Dispatch, SetStateAction, useState } from "react";
import logo from "../../images/Logo.svg";
import { Button, Container,  Navbar, Stack } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { authLens } from '../../modules/auth/services/Auth'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  const { data } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (data)
    return (
      <div>
        Connected to {data.address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

interface Props {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}



const Header: React.FC<Props> = (props: Props) => {
    const [address, setAddress] = useState("");
    
    const login = async () => {
        let connectedAccount = await authLens();
        let account = connectedAccount
        setAddress(account);
        props.setIsLoggedIn(!props.isLoggedIn)
    }
   


    const logout = () => {
        props.setIsLoggedIn(!props.isLoggedIn);
    }


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

                    {!props.isLoggedIn
                        ? <Stack direction="horizontal" gap={2}>
                            <Link to="/signUp">
                                <Button className="m">Claim Profile</Button>
                            </Link>

                                <Button onClick={() => login()} className="m">SignIn</Button>

                        </Stack>

                        : <Stack direction="horizontal" gap={2}>
                            <Link to="/signUp">
                                <Button className="m">Claim Profile</Button>
                            </Link>
                            <Link to="/profile">
                                <Button className="m">{address.substring(0, 6) + '...' + address.substring(address.length - 4)}</Button>
                            </Link>
                            <Link to='/'>
                                <Button onClick={() => logout()}> Sign out</Button>
                            </Link>
                        </Stack>
                    }

                    <Profile />

                </Container>
            </Navbar>
        </>
    );

    return renderContainer();
};

export default Header;


