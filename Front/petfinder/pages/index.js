import React, { useState } from "react";

import { Flex, flex } from "@chakra-ui/react";
import Header from "../components/Header";
import List from "../components/List";
import MapView from "../components/MapView";
import PlaceDetail from "../components/PlaceDetail";

function Home() {
 

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      maxWidth={"100vw"}
      maxHeight={"100vh"}
      position={"relative"}
    >
      {/* <Header />

      <List /> */}

      <MapView />
    </Flex>
  );
}

export default Home;
