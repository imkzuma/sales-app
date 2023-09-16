import { ReactNode } from "react";
import { Container } from "@chakra-ui/react";
import MainNavbar from "../navbar/MainNavbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      maxW="full"
      p={0}
      bg={'gray.50'}
      minH={'100vh'}
    >
      <MainNavbar />

      <Container
        minH={'100vh'}
        maxW={'7xl'}
      >
        {children}
      </Container>
      <footer>footer</footer>
    </Container>
  )
}