import Head from "next/head";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react";

import Link from "next/link";

export default function Register() {
  return (
    <>
      <Head>
        <title>BarberPRO - Faça seu registro para acessar</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              quality={100}
              width={240}
              objectFit="fill"
              alt="Logo barberpro"
            />
          </Center>
          <Input
            background="barber.400"
            size="lg"
            placeholder="Qual nome da sua barbearia?"
            type="text"
            mb={3}
            color="#fff"
          />
          <Input
            background="barber.400"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
            color="#fff"
          />

          <Input
            background="barber.400"
            size="lg"
            placeholder="********"
            type="password"
            mb={6}
            color="#fff"
          />

          <Button
            background="buttons.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            fontWeight="bold"
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text
                cursor="pointer"
                color="#fff"
                _hover={{ color: "barber.100" }}
              >
                <Link href="/login">
                  Já possui conta? <strong>Fazer login</strong>
                </Link>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
