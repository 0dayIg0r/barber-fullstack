import { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";

import { FiScissors, FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import Link from "next/link";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const linkItems: Array<LinkItemProps> = [
  { name: "agenda", icon: FiScissors, route: "/dashboard" },
  { name: "cortes", icon: FiClipboard, route: "/haircuts" },
  { name: "Minha conta", icon: FiSettings, route: "/profile" },
];

export function Sidebar({ children }: { children: ReactNode }) {
  const { onOpen, onClose } = useDisclosure();
  return (
    <Box minH={"100vh"} bg={"barber.900"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Box>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={"barber.400"}
      borderRight={"1px"}
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      h={"full"}
      {...rest}
    >
      <Flex
        h={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx={8}
      >
        <Link href={"/dashboard"} passHref>
          <Flex cursor={"pointer"} userSelect={"none"} flexDirection={"row"}>
            <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>
              Barber
            </Text>
            <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>
              NINJA
            </Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
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
            mr={"4"}
            fontSize={"16"}
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
