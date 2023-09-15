import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "@/components/sidebar";
import { ReactNode, useState } from "react";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Box
      w={'full'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      minH={'100vh'}
    >
      <Box
        borderBottom={useColorModeValue('2px solid #e2e8f0', 'none')}
        bg={useColorModeValue('rgba(255,255,255,0.9)', 'gray.900')}
        backdropFilter={useColorModeValue('blur(10px)', 'none')}
        pos="sticky"
        top={0}
        zIndex={999}
      >
        <Container
          maxW={'8xl'}
          px={{ md: 0, lg: 5 }}
        >
          <DashboardNavbar
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
        </Container>
      </Box>

      <Container
        maxW={'8xl'}
        px={{ md: 0, lg: 5 }}
      >
        <Flex w={'full'} py={5} gap={10}>
          <Sidebar
            w={isOpen ? '16rem' : 0}
            transition="width 0.6s"
            isOpen={isOpen}
            display={{ base: 'none', lg: 'block' }}
          />
          <Box as="section"
            w={'full'}
          >
            {children}
          </Box>

        </Flex>
      </Container>
    </Box>
  )
}