import { Sidebar } from "@/src/components/sidebar";
import { setupAPIClient } from "@/src/services/api";
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
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [list, setList] = useState(schedule);

  return (
    <>
      <Head>
        <title>BarberPRO - Painel</title>
      </Head>
      <Sidebar>
        <Flex direction="column" width="100%" p={4} gap={4} align="center">
          {/* Header Compact */}
          <Flex
            w="100%"
            maxW="800px"
            direction="row"
            justify="space-between"
            align="center"
            mb={2}
          >
            <Flex direction="column" align="flex-start">
              <Heading fontSize="xl" fontWeight="semibold" color="white">
                Agendamentos
              </Heading>
              <Text fontSize="xs" color="gray.300">
                {list.length} {list.length === 1 ? "item" : "itens"}
              </Text>
            </Flex>

            <Link href="/new" passHref>
              <Button
                bg="barber.100"
                color="barber.900"
                _hover={{ bg: "barber.200" }}
                size="sm"
                px={4}
              >
                Novo
              </Button>
            </Link>
          </Flex>

          {/* Content Box */}
          <Flex
            direction="column"
            width="100%"
            maxW="800px"
            gap={2}
            align="center"
          >
            {list.length > 0 ? (
              <>
                {/* Table Header (minimal) */}
                <Flex
                  w="100%"
                  p={2}
                  bg="barber.700"
                  rounded="md"
                  align="center"
                  fontSize="xs"
                >
                  <Text width="50%" color="gray.300" pl={2}>
                    Cliente
                  </Text>
                  <Text width="30%" color="gray.300">
                    Serviço
                  </Text>
                  <Text width="20%" color="gray.300" textAlign="right" pr={2}>
                    Valor
                  </Text>
                </Flex>

                {/* Schedule Items (compact) */}
                {list.map((item) => (
                  <ChakraLink
                    key={item.id}
                    w="100%"
                    style={{ textDecoration: "none" }}
                  >
                    <Flex
                      w="100%"
                      direction="row"
                      p={2}
                      rounded="md"
                      bg="barber.600"
                      _hover={{ bg: "barber.550" }}
                      align="center"
                      fontSize="sm"
                    >
                      <Flex width="50%" align="center" pl={2}>
                        <IoMdPerson size={16} color="#f1f1f1" />
                        <Text ml={2} color="white">
                          {item.customer}
                        </Text>
                      </Flex>

                      <Text width="30%" color="white">
                        {item.haircut.name}
                      </Text>

                      <Text
                        width="20%"
                        color="white"
                        textAlign="right"
                        pr={2}
                        fontWeight="semibold"
                      >
                        {typeof item.haircut.price === "number"
                          ? new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.haircut.price)
                          : item.haircut.price}
                      </Text>
                    </Flex>
                  </ChakraLink>
                ))}
              </>
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                p={6}
                bg="barber.700"
                rounded="md"
                textAlign="center"
                width="100%"
              >
                <Text color="gray.300" mb={3}>
                  Nenhum agendamento
                </Text>
                <Link href="/new">
                  <Button
                    bg="barber.100"
                    color="barber.900"
                    size="sm"
                    _hover={{ bg: "barber.200" }}
                  >
                    Criar Agendamento
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const res = await apiClient.get("schedule");

    return {
      props: {
        schedule: res.data,
      },
    };
  } catch (error: any) {
    console.error("Erro ao buscar agendamentos:", error.message);
    return {
      props: {
        schedule: [],
      },
    };
  }
});
