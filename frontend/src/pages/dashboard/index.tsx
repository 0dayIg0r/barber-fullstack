import { Sidebar } from "@/src/components/sidebar";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color={"white"}>
              Agenda
            </Heading>
            <Link href="/new">
              <Button>Registrar</Button>
            </Link>
          </Flex>

          <ChakraLink
            w="100%"
            m={0}
            p={0}
            mt={1}
            bg="transparent"
            style={{ textDecoration: "none" }}
          >
            <Flex
              w="100%"
              direction={"row"}
              p={4}
              rounded={4}
              mb={4}
              bg="barber.400"
              justify="space-between"
              align={"center"}
            >
              <Flex direction="row" mb={0} align="center" justify="center">
                <IoMdPerson size={28} color="#f1f1f1" />
                <Text fontWeight="bold" ml={4} color={"white"}>
                  Matheus Fraga
                </Text>
              </Flex>

              <Text fontWeight="bold" mb={0} color={"white"}>
                Corte completo
              </Text>
              <Text fontWeight="bold" mb={0} color={"white"}>
                R$ 59.90
              </Text>
            </Flex>
          </ChakraLink>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
