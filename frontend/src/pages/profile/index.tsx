import { Sidebar } from "@/src/components/sidebar";
import { signOut } from "@/src/context/signOut";
import { setupAPIClient } from "@/src/services/api";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}
function Profile({ user, premium }: ProfileProps) {
  const [name, setName] = useState(user && user?.name);
  const [address, setAddress] = useState(
    user?.address === null ? "Sem endereço, cadastre agora" : user?.address
  );

  async function handleUpdate() {
    if (name === "") {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/users", {
        name: name,
        address: address,
      });

      location.reload();
    } catch (err) {
      throw new Error(err.message);
    }
  }
  return (
    <>
      <Head>
        <title>Minha conta - BarberNINJA</title>
      </Head>

      <Sidebar>
        <Flex
          fontFamily={"body"}
          direction="column"
          align="flex-start"
          justify="flex-start"
          maxW="700px"
          w="100%"
          mx="auto"
          px={4}
        >
          <Heading
            fontSize="3xl"
            color="white"
            mt={6}
            mb={6}
            w="100%"
            textAlign="left"
          >
            Minha conta
          </Heading>

          <Flex
            direction="column"
            bg="barber.400"
            p={6}
            borderRadius="md"
            w="100%"
          >
            <Text
              mb={3}
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="left"
            >
              Nome da Barbearia:
            </Text>

            <Input
              bg="gray.900"
              placeholder="Nome da sua barbearia"
              color="white"
              _placeholder={{ color: "gray.400" }}
              border="none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _focus={{
                borderColor: "barber.200",
                boxShadow: "0 0 0 2px #D69E2E",
              }}
              w="100%"
            />

            <Text
              mb={3}
              mt={3}
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="left"
            >
              Endereço:
            </Text>

            <Input
              bg="gray.900"
              placeholder="Endereço da sua barbearia"
              color={user?.address === null ? "orange.500" : "white"}
              _placeholder={{ color: "white" }}
              border="none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              _focus={{
                borderColor: "barber.200",
                boxShadow: "0 0 0 2px #D69E2E",
              }}
              w="100%"
            />

            <Text
              mb={3}
              mt={3}
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="left"
            >
              Plano atual:
            </Text>

            <Flex
              direction="row"
              w="100%"
              mb={3}
              p={1}
              borderWidth={1}
              rounded={6}
              background="barber.900"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                p={2}
                fontSize={"lg"}
                color={'green.600'}
              >
                {premium ? "Premium" : "Gratuito"}
              </Text>
              <Link href={"/planos"}>
                <Box
                  cursor="pointer"
                  p={1}
                  pl={2}
                  pr={3}
                  rounded={4}
                  bg={"green.600"}
                  color="white"
                  fontWeight={"bolder"}
                >
                  {premium ? "Desativar" : "Mudar plano"}
                </Box>
              </Link>
            </Flex>

            <Button
              w={"100%"}
              mt={3}
              mb={4}
              bg={"button.cta"}
              size="lg"
              borderColor={"white"}
              fontWeight={"bolder"}
              _hover={{ bg: "#ffb13e", borderColor: "#ffb13e" }}
              onClick={handleUpdate}
            >
              Salvar
            </Button>

            <Button
              w={"100%"}
              mb={6}
              borderColor={"red.500"}
              color={"red.500"}
              size="lg"
              fontWeight={"bolder"}
              _hover={{ bg: "red.500", color: "white" }}
              onClick={signOut}
            >
              Sair da conta
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const res = await apiClient.get("/me");

    const user = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      address: res.data?.address,
    };

    return {
      props: {
        user: user,
        premium: res.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});

export default Profile;
