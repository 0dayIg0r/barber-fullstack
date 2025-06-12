import { Sidebar } from "@/src/components/sidebar";
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
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

function NewHaircut() {
  const [isMobile] = useMediaQuery(["(max-width: 500px)"]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (!name || !price) {
      alert("Preencha todos os campos!");
      return;
    }
    console.log({ name, price });
    // Envio para backend ou tratamento
  };

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
              <Text fontWeight={"bold"} color={"orange.900"}>
                Nome do corte
              </Text>
              <Input
                placeholder="Ex: Corte degradê"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="white"
              />
              <Text fontWeight={"bold"} color={"orange.900"}>
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
                onClick={handleSubmit}
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
        </Flex>
      </Sidebar>
    </>
  );
}

export default NewHaircut;
