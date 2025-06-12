import { Sidebar } from "@/src/components/sidebar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import Head from "next/head";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";
import React from "react";
import { whiten } from "@chakra-ui/theme-tools";

function Haircuts() {
  const [isMobile] = useMediaQuery(["(max-width: 500px)"]);

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha Barbearia</title>
      </Head>

      <Sidebar>
        <Box w="100%" p={4}>
          {/* Header */}
          <Flex
            direction={isMobile ? "column" : "row"}
            align={isMobile ? "flex-start" : "center"}
            justify="space-between"
            gap={4}
            mb={6}
          >
            <Heading fontSize="3xl" color="orange.900">
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new" passHref>
              <Button
                colorScheme="orange"
                size="md"
                w={isMobile ? "100%" : "auto"}
              >
                Cadastrar novo
              </Button>
            </Link>
          </Flex>

          {/* Filtro de status */}
          <Stack>
            <Switch.Root size="lg">
              <Switch.HiddenInput />
              <Switch.Control
                bg="gray.300"
                _checked={{ bg: "orange.500" }} // Cor da trilha quando ativado
                _focusVisible={{ boxShadow: "0 0 0 2px orange.300" }}
              >
                <Switch.Thumb bg="white" /> {/* Cor da bolinha */}
              </Switch.Control>
              <Switch.Label ml={2} fontWeight="bold" color={"white"}>
                ATIVOS
              </Switch.Label>
            </Switch.Root>
          </Stack>

          {/* Lista de cortes */}
          <Stack>
            <Link href="/haircuts/123">
              <Box
                bg="barber.400"
                p={4}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "barber.500" }}
                transition="0.2s"
              >
                <Flex align="center" mb={2}>
                  <Box as={IoMdPricetag} color="white" boxSize={6} mr={2} />
                  <Text fontSize="lg" fontWeight="semibold" color="white">
                    Corte completo
                  </Text>
                </Flex>
                <Text fontSize="sm" color="white">
                  Preço: R$ 59,90
                </Text>
              </Box>
            </Link>
          </Stack>
        </Box>
      </Sidebar>
    </>
  );
}

export default Haircuts;
