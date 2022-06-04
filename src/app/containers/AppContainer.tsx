import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../../modules/auth/pages/SignUp";
import Dashboard from "../../modules/dashboard/pages/Dashboard";
import Profile from "../../modules/profile/pages/Profile";
import CreateBounty from "../../modules/bounty/pages/CreateBounty"
import Header from "./Header";
import Post from "../../modules/details/pages/Post";
import { WagmiConfig, createClient, useContract, useContractRead } from 'wagmi'
import bountyContract from '../../abis/TestContract.json'
import config from '../../config/config'
import { providers } from "ethers";

const client = createClient({
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, 'I4KCixYGLCmDLITHwE6eL0NE9HEIpb60')
  },

})

interface Props { }

const AppContainer: React.FC<Props> = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderContainer = () => (
    <WagmiConfig client={client}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Dashboard setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/signUp" element={<SignUp setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />

          <Route path="/create-bounty" element={<CreateBounty />} />

          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  );

  return renderContainer();
};

export default AppContainer;
