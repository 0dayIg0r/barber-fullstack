import { Sidebar } from "@/src/components/sidebar";
import { Button, Flex, Heading, Input, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function EditHaircut() {
  const [isMobile] = useMediaQuery(["max-width: 500px"]);
  const [disable, setDisable] = useState("enabled");

  async function handleDisabled() {}
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
                />
                <Input
                  placeholder="Valor ex: 99,99"
                  bg={"gray.900"}
                  mb={4}
                  type="number"
                  w={"100%"}
                  color={"white"}
                />
                <Button onClick={handleDisabled} mb={5}>Desativar</Button>
                <Button onClick={handleDisabled}>Salvar</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}


