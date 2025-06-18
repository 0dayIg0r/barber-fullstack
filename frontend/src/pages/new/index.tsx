import { Sidebar } from "@/src/components/sidebar";
import { setupAPIClient } from "@/src/services/api";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import {
  createListCollection,
  Flex,
  Heading,
  Input,
  Portal,
  Select,
  Box,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [selectedService, setSelectedService] = useState(haircuts[0]);
  const router = useRouter()

  const frameworks = createListCollection({
    items: haircuts.map((haircut) => ({
      value: haircut.id,
      label: `${haircut.name} - R$ ${Number(haircut.price).toFixed(2)}`,
    })),
  });

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((i) => i.id === id);

    setSelectedService(haircutItem);
  }

  async function handleSchedule() {
    try {
      const apiClient = setupAPIClient();
      await apiClient.post("schedule",{
        customer: customer,
        haircut_id:  selectedService.id
      });

      router.push('/dashboard')
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>barberNINJA - Novo Agendamento</title>
      </Head>
      <Sidebar>
        <Box bg="gray.50" minH="100vh" p={{ base: 4, md: 8 }}>
          <Flex
            direction="column"
            maxW="2xl"
            mx="auto"
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
            p={{ base: 6, md: 8 }}
          >
            {/* Header */}
            <Box mb={8} pb={4} borderBottom="1px solid" borderColor="gray.100">
              <Heading size="lg" fontWeight="semibold" color="gray.800">
                Novo Agendamento
              </Heading>
              <Box fontSize="sm" color="gray.500" mt={1}>
                Preencha os dados do cliente
              </Box>
            </Box>

            {/* Form */}
            <Flex direction="column" gap={6}>
              {/* Nome do Cliente */}
              <Box>
                <Box
                  as="label"
                  display="block"
                  mb={2}
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.600"
                >
                  Nome do Cliente *
                </Box>
                <Input
                  placeholder="Ex: João Silva"
                  value={customer}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCustomer(e.target.value)
                  }
                  size="md"
                  bg="gray.50"
                  borderRadius="lg"
                  borderColor="gray.200"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce",
                    bg: "white",
                  }}
                  px={4}
                  py={3}
                />
              </Box>

              {/* Serviço */}
              <Box>
                <Box
                  as="label"
                  display="block"
                  mb={2}
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.600"
                >
                  Serviço *
                </Box>
                <Select.Root
                  collection={frameworks}
                  value={selectedService ? [selectedService] : []}
                  onValueChange={(value) => {
                   
                    if (typeof value === "string") {
                      setSelectedService(value);
                      handleChangeSelect(value);
                    } else if (Array.isArray(value)) {
                      const selected = value[0];
                      setSelectedService(selected);
                      handleChangeSelect(selected);
                    } else {
                      console.warn("Valor inesperado:", value);
                    }
                  }}
                  size="md"
                  width="100%"
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger
                      bg="gray.50"
                      borderRadius="lg"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      px={4}
                      py={3}
                    >
                      <Select.ValueText placeholder="Selecione um serviço" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content
                        bg="white"
                        borderRadius="lg"
                        boxShadow="xl"
                        borderWidth="1px"
                        borderColor="gray.200"
                        py={1}
                        zIndex="dropdown"
                      >
                        {frameworks.items.map((service) => (
                          <Select.Item
                            item={service}
                            key={service.value}
                            px={4}
                            py={3}
                            _hover={{ bg: "blue.50" }}
                            _focus={{ bg: "blue.50" }}
                            _selected={{ bg: "blue.100" }}
                            onChange={(e) => handleChangeSelect(e.target.value)}
                          >
                            {service.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Box>

              <Flex justify="flex-end" mt={8}>
                <Button
                  colorScheme="blue"
                  size="md"
                  px={8}
                  fontWeight="medium"
                  borderRadius="lg"
                  onClick={handleSchedule}
                >
                  Agendar
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Sidebar>
    </>
  );
}

export default New;

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
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: res.data,
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
