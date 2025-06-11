import { Sidebar } from "@/src/components/sidebar";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

function Dashboard() {

  return (
    <>
      <Head>
        <title>Barber NINJA - Minha Barbearia</title>
      </Head>

      <Sidebar>
        <Flex>
          <Text>Bem vindo ao dashboard</Text>
        </Flex>
      </Sidebar>
    </>
  );
}

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
