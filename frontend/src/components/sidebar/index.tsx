import { ReactNode } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useDisclosure,
  BoxProps,
  FlexProps,
  Text,
} from "@chakra-ui/react";

import { FiScissors, FiClipboard, FiSettings } from "react-icons/fi";
import Link from "next/link";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const linkItems: Array<LinkItemProps> = [
  { name: "AGENDA", icon: FiScissors, route: "/dashboard" },
  { name: "CORTES", icon: FiClipboard, route: "/haircuts" },
  { name: "MINHA CONTA", icon: FiSettings, route: "/profile" },
];

export function Sidebar({ children }: { children: ReactNode }) {
  const { onOpen, onClose } = useDisclosure();
  return (
    <Box minH={"100vh"} bg={"barber.900"} display="flex" fontFamily={"body"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Box flex={1} p={4}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={"white"}
      borderRight={"1px"}
      borderRightColor={"gray.700"}
      w={{ base: "full", md: 60 }}
      h={"100vh"}
      {...rest}
    >
      <Flex
        h={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx={8}
      >
        <Link href={"/dashboard"} passHref>
          <Flex
            cursor={"pointer"}
            userSelect={"none"}
            flexDirection={"row"}
          ></Flex>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Link>
      </Flex>
      <Flex h={20} alignItems={"center"} justifyContent={"center"} mx={8}>
        <Link href={"/dashboard"} passHref>
          <Flex cursor={"pointer"} userSelect={"none"} flexDirection={"row"}>
            <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight="bold">
              Barber
            </Text>
            <Text
              fontSize={"2xl"}
              fontFamily={"monospace"}
              fontWeight="bold"
              color={"orange"}
            >
              NINJA
            </Text>
          </Flex>
        </Link>
      </Flex>
      {linkItems.map((link) => (
        <NavItem icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}
const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        fontWeight={"bold"}
        align={"center"}
        p={"4"}
        mx={"4"}
        borderRadius={"lg"}
        role="group"
        cursor={"pointer"}
        _hover={{
          bg: "barber.900",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            color={"orange"}
            mr={"4"}
            fontSize={"2xl"}
            as={icon}
            _groupHover={{
              color: "white",
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};