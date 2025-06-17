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
import React, { ChangeEvent, useState } from "react";
import { whiten } from "@chakra-ui/theme-tools";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

interface HaircutsItem {
  id: string;
  name: string;
  price: number;
  status: boolean;
  userid_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery(["(max-width: 500px)"]);

  const [haircutList, setHaircurtList] = useState<HaircutsItem[]>(
    haircuts || []
  );
  const [disable, setDisable] = useState("enabled");

  async function handleDisabled() {
    const apiClient = setupAPIClient();
    if (disable === "enabled") {
      setDisable("disabled");

      const res = await apiClient.get("/haircut", {
        params: {
          status: false,
        },
      });

      setHaircurtList(res.data);
    } else {
      setDisable("enabled");
      const apiClient = setupAPIClient();

      const res = await apiClient.get("/haircut", {
        params: {
          status: true,
        },
      });

      setHaircurtList(res.data);
    }
  }
  return (
    <>
      <Head>
        <title>Modelos de corte - Minha Barbearia</title>
      </Head>

      <Sidebar>
        <Box w="100%" p={4}>
         
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

          <Stack>
  
            <Flex>
              <Button onClick={handleDisabled}>
                Ver cortes {disable === "enabled" ? "ativos" : "desativados"}
              </Button>
            </Flex>
          </Stack>

         
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

          {haircutList.map((haircut) => (
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`}>
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
                    {haircut.name}
                  </Text>
                </Flex>
                <Text fontSize="sm" color="white">
                  {haircut.price}
                </Text>
              </Box>
            </Link>
          ))}
        </Box>
      </Sidebar>
    </>
  );
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const res = await apiClient.get("/haircut", {
      params: {
        status: true,
      },
    });
   

    if (res.data === null) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        haircuts: res.data,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});



export default Haircuts;
