import { Sidebar } from "@/src/components/sidebar";
import { setupAPIClient } from "@/src/services/api";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {
  
  const [isMobile] = useMediaQuery(["(max-width: 500px)"]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleRegister() {
    if (name === "" || price === "") {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/haircut", {
        name: name,
        price: Number(price),
      });
    } catch (err) {
      alert("Erro ao cadastrar esse modelo.");
    }
  }

  return (
    <>
      <Head>
        <title>BarberNINJA - Cadastrar tipo de corte</title>
      </Head>

      <Sidebar>
        <Flex w="100%" p={4} direction="column">
          <Flex justifyContent={"row"}>
            <Button>
              <FiChevronLeft size={24} color="white" />
              <Text>Voltar</Text>
            </Button>
          </Flex>
          <Heading fontSize="2xl" mb={6} color="orange.900">
            Cadastrar novo corte
          </Heading>

          <Box as="form" w="100%" maxW="500px">
            <Stack>
              <Text fontWeight={"bold"} color={"white"}>
                Nome do corte
              </Text>
              <Input
                placeholder="Ex: Corte degradê"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="white"
              />
              <Text fontWeight={"bold"} color={"white"}>
                Preço
              </Text>
              <Input
                type="number"
                placeholder="Ex: 59.90"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                bg="white"
              />
              <Button
                onClick={handleRegister}
                backgroundColor={"orange.900"}
                mt={5}
                fontWeight={"bold"}
                w={isMobile ? "100%" : "100%"}
                _hover={{ bg: "orange.400" }}
              >
                Cadastrar
              </Button>
            </Stack>
          </Box>

          {!subscription && count >= 3 && (
            <Link href="/plans" passHref>
              <Text color="red.500" fontWeight="bold" cursor="pointer">
                Seja premium
              </Text>
            </Link>
          )}

          {subscription && (
            <Text color="green.500" fontWeight="bold">
              Parabéns, você é nosso usuário premium
            </Text>
          )}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const res = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscription:
          res.data?.subscriptions?.status === "active" ? true : false,
        count: count.data.count,
      },
    };
  } catch (e) {
    console.log(e.message);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
