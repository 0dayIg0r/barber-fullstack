import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Olimpo - Barber</title>
      </Head>

      <Flex backgroundColor='barber.900' height={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Text >Olá</Text>
      </Flex>
    </>
  );
}

export default Home;
