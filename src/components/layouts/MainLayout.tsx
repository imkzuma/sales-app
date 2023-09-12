import { ReactNode } from "react";
import { Container } from "@chakra-ui/react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  )
}