import { Sidebar } from "@/src/components/sidebar";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

function Profile() {
  return (
    <>
      <Head>
        <title>Minha conta - BarberNINJA</title>
      </Head>

      <Sidebar>
        <Flex
          direction="column"
          align="flex-start"
          justify="flex-start"
          maxW="700px"
          w="100%"
          mx="auto" // centraliza horizontalmente na tela
          px={4} // padding horizontal para não encostar nas bordas da tela
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
            p={6} // padding em todas as direções para espaçamento
            borderRadius="md" // bordas arredondadas para suavizar visualmente
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
              _focus={{
                borderColor: "barber.200",
                boxShadow: "0 0 0 2px #D69E2E",
              }} // foco com destaque
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
              placeholder="Nome da sua barbearia"
              color="white"
              _placeholder={{ color: "gray.400" }}
              border="none"
              _focus={{
                borderColor: "barber.200",
                boxShadow: "0 0 0 2px #D69E2E",
              }} // foco com destaque
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
              <Text p={2} fontSize={"lg"} color="green.500">
                Plano Grátis
              </Text>
              <Link href={"/planos"}>
                <Box
                  cursor="pointer"
                  p={1}
                  pl={2}
                  pr={3}
                  rounded={4}
                  bg={"#00cd52"}
                  color="white"
                    fontWeight={'bolder'}
                >
                  Mudar plano
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
                fontWeight={'bolder'}
              _hover={{ bg: "#ffb13e", borderColor: "#ffb13e" }}
            >
              Salvar
            </Button>
            <Button
              w={"100%"}
              mb={6}
              borderColor={"red.500"}
              color={"red.500"}
              size="lg"
              fontWeight={'bolder'}
              _hover={{ bg: "red.500", color: "white" }}
            >
              Sair da conta
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export default Profile;
