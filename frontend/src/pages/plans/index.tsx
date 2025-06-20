import { Sidebar } from "@/src/components/sidebar";
import { setupAPIClient } from "@/src/services/api";
import { getStripeJs } from "@/src/services/stripe-ts";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

interface PlansProps {
  premium: boolean;
}

function Plans({ premium }: PlansProps) {
  const [isMobile] = useMediaQuery(["max-width: 500px"]);

  const handleSubscription = async () => {
    if (premium) {
      return;
    }

    try {
      const apiClient = setupAPIClient();

      const res = await apiClient.post("/subscribe");

      const { sessionId } = res.data;
      console.log(res.data);

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <Head>
        <title>Barber Pro - Sua assinatura Premium</title>
      </Head>

      <Sidebar>
        <Flex
          w="100%"
          direction="column"
          align="center"
          justify="center"
          px={4}
        >
          <Heading
            color="white"
            fontSize="3xl"
            mt={6}
            mb={8}
            textAlign="center"
          >
            Escolha o plano ideal para você
          </Heading>

          <Flex
            gap={8}
            w="100%"
            maxW="900px"
            flexDirection={isMobile ? "column" : "row"}
            justify="center"
            align="stretch"
          >
            {/* PLANO GRÁTIS */}
            <Flex
              rounded="2xl"
              p={6}
              flex={1}
              bg="gray.800"
              flexDirection="column"
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.03)", boxShadow: "xl" }}
              color="gray.100"
              textAlign="left"
            >
              <Heading textAlign="center" fontSize="2xl" color="white" mb={4}>
                Plano Grátis
              </Heading>
              <Text fontWeight="medium" mb={2}>
                ✔ Registrar cortes.
              </Text>
              <Text fontWeight="medium" mb={2}>
                ✔ Criar até 3 modelos de corte.
              </Text>
              <Text fontWeight="medium" mb={2}>
                ✔ Editar dados do perfil.
              </Text>
            </Flex>

            {/* PLANO PREMIUM */}
            <Flex
              rounded="2xl"
              p={6}
              flex={1}
              bg="gray.900"
              flexDirection="column"
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.03)", boxShadow: "xl" }}
              color="gray.100"
              textAlign="left"
            >
              <Heading textAlign="center" fontSize="2xl" color="#31fb6a" mb={4}>
                Premium
              </Heading>
              <Text fontWeight="medium" mb={2}>
                ✔ Registrar cortes ilimitados.
              </Text>
              <Text fontWeight="medium" mb={2}>
                ✔ Criar modelos ilimitados.
              </Text>
              <Text fontWeight="medium" mb={2}>
                ✔ Editar modelos de corte.
              </Text>
              <Text fontWeight="medium" mb={2}>
                ✔ Editar dados do perfil.
              </Text>
              <Text fontWeight="medium" mb={2}>
                ✔ Receber todas atualizações.
              </Text>
              <Text
                color="#31fb6a"
                fontWeight="bold"
                fontSize="2xl"
                mt={4}
                mb={6}
                textAlign="center"
              >
                R$ 9.99/mês
              </Text>

              <Button
                bg="green.600"
                color="white"
                fontWeight="bold"
                size="lg"
                _hover={{ bg: "orange.700" }}
                alignSelf="center"
                px={8}
                onClick={handleSubscription}
                disabled={premium}
              >
                {premium
                  ? "VOCÊ É JÁ É NOSSO ASSINANTE"
                  : "FAZER UMA ASSINATURA"}
              </Button>
              {premium && (
                <Flex
                  justify={"center"}
                  align={"center"}
                  _hover={{ color: "orange.600" }}
                  cursor={"pointer"}
                >
                  <Text>Alterar assinatura</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  try {
    const res = await apiClient.get("/me");

    const isPremium =
      res.data?.subscriptions?.status === "active" ? true : false;

    return {
      props: {
        premium: isPremium,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error.message);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});

export default Plans;
