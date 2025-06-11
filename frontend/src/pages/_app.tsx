import type { AppProps } from "next/app";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { AuthProvider } from "../context/authContext";
import "@fontsource/roboto/400.css";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        barber: {
          900: { value: "#12131b" },
          400: { value: "#1b1c29" },
          100: { value: "#c6c6c6" },
        },
        buttons: {
          cta: { value: "#fba931" },
          default: { value: "#FFFF" },
          gray: { value: "#dfdfdf" },
          danger: { value: "#FF4040" },
        },
        orange: {
          900: { value: "#fba931" },
        },
        orangeToDark: {
          value: "linear-gradient(to bottom, #12131b 3%, #fba931 100%)",
        },
        fontFamily: {
          body: { value: "Roboto, sans-serif" },
          heading: { value: "Roboto, sans-serif" },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
