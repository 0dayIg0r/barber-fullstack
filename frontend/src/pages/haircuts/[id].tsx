import { Sidebar } from "@/src/components/sidebar";
import { setupAPIClient } from "@/src/services/api";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface HaircutProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface SubscriptionsProps {
  id: string;
  status: string | boolean;
}

interface EditHairCutProps {
  haircut: HaircutProps;
  subscription: SubscriptionsProps | null;
}

export default function EditHaircut({
  subscription,
  haircut,
}: EditHairCutProps) {
  const [isMobile] = useMediaQuery(["max-width: 500px"]);
  const [disable, setDisable] = useState(
    haircut?.status ? "disabled" : "enabled"
  );

  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);

  function handleDisable() {
    if (disable === "disabled") {
      setDisable("enable");
      setStatus(false);
    } else {
      setDisable("disable");
      setStatus(true);
    }
  }

  async function handleUpdate() {
    if (name === "" || price === "") {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/haircut", {
        name,
        price: Number(price),
        status,
        haircut_id: haircut?.id,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      alert("Informações alteradas.");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return (
    <>
      <Head>
        <title>Editar Modelo</title>
      </Head>
      <Sidebar>
        <Flex
          direction={"colum"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            width={"100%"}
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href={"/haircuts"} passHref>
              <Button
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                mr={3}
              >
                <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>
            <Flex
              maxW={"700px"}
              pt={8}
              pb={8}
              mt={4}
              w={"100%"}
              bg={"barber.400"}
              direction={"column"}
              align={"center"}
              justify={"center"}
            >
              <Heading
                fontSize={isMobile ? "22px" : "3xl"}
                color={"white"}
                mb={4}
              >
                Editar informações do corte
              </Heading>

              <Flex w={"85%"} direction={"column"}>
                <Input
                  placeholder="Nome do corte"
                  bg={"gray.900"}
                  mb={4}
                  type="text"
                  w={"100%"}
                  color={"white"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Valor ex: 99,99"
                  bg={"gray.900"}
                  mb={4}
                  type="number"
                  w={"100%"}
                  color={"white"}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Button
                  mb={5}
                  color={status ? "red.700" : "green.700"}
                  onClick={() => setStatus(!status)}
                >
                  {status ? "Desativar" : "Ativar"}
                </Button>
                <Button
                  disabled={subscription?.status !== "active"}
                  onClick={handleUpdate}
                >
                  Salvar
                </Button>
                {subscription?.status !== "active" && (
                  <Flex direction={"row"} align={"center"} justify={"center"}>
                    <Link href={"/plans"}>
                      <Text fontWeight={"bold"} mr={1} color={"#31fb6a"} mt={5}>
                        Seja premium e tenha todos acessos liberados
                      </Text>
                    </Link>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;

  try {
    const apiClient = setupAPIClient(ctx);
    const check = await apiClient.get("/haircut/check");
  

    const res = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    return {
      props: {
        haircut: res.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});
