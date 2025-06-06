import { Flex, Text } from "@chakra-ui/react"
import Head from "next/head"

function Dashboard() {
  return (
    <>
    <Head>
        <title>
            Barber NINJA - Minha Barbearia
        </title>
        <Flex>
            <Text>
                Bem vindo ao dashboard
            </Text>
        </Flex>
    </Head>
    </>
  )
}

export default Dashboard