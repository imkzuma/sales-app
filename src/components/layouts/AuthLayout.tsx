import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex as="main"
      minH={{ md: '100vh' }}
      w={'full'}
      align={{ md: 'center' }}
      justify={{ md: 'center' }}
      p={{ base: 5, md: 0 }}
    >
      {children}
    </Flex>
  )
}