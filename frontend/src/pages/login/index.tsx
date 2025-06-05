import { useState } from "react";
import { useAuth } from "@/src/context/authContext";
import Head from "next/head";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react";

import Link from "next/link";

export default function Login() {
  const { user, isAuthenticated, setUser, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn({
      email,
      password,
    });
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar</title>
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
              width={300}
              objectFit="fill"
              alt="Logo barberpro"
            />
          </Center>

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            background="barber.400"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
            color="#fff"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text
                cursor="pointer"
                color="#fff"
                _hover={{ color: "barber.100" }}
              >
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
