import Head from "next/head";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/src/context/authContext";
import { navigateTo } from "@/src/context/navigateTo";
import { canSSRGuest } from "@/src/utils/canSSRGuest";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUp } = useAuth();

  async function handleRegister() {
    if (name === "" && email === "" && password === "") {
      return;
    }

    await signUp({
      name,
      email,
      password,
    });

    navigateTo('/login')

  }

  return (
    <>
      <Head>
        <title>BarberPRO - Faça seu registro para acessar</title>
      </Head>

      <Flex bg="barber.900" minH="100vh" align="center" justify="center" px={4}>
        <Flex
          direction="column"
          bg="barber.800"
          w="100%"
          maxW="500px"
          p={{ base: 6, md: 14 }}
          borderRadius={8}
        >
          <Center mb={6}>
            <Image
              src={logoImg}
              quality={100}
              width={300}
              objectFit="contain"
              alt="Logo barberpro"
            />
          </Center>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg="barber.400"
            size="lg"
            placeholder="Qual nome da sua barbearia?"
            type="text"
            mb={3}
            color="#fff"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="barber.400"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
            color="#fff"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="barber.400"
            size="lg"
            placeholder="********"
            type="password"
            mb={6}
            color="#fff"
          />

          <Button
            bg="buttons.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            fontWeight="bold"
            onClick={handleRegister}
          >
            Cadastrar
          </Button>

          <Center>
            <Link href="/login" passHref>
              <Text
                as="a"
                cursor="pointer"
                color="#fff"
                _hover={{ color: "barber.100" }}
              >
                Já possui conta? <strong>Fazer login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});

