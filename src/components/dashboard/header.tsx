import { Flex, Icon, Stack, Text } from "@chakra-ui/react";

export function DashboardHeader({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Stack as="header" spacing={5}>
      <Flex
        gap={2}
        align={'center'}
      >
        <Icon as={icon} />
        <Text fontSize={'sm'} as="h5">
          {title}
        </Text>
      </Flex>
      <Stack spacing={0}>
        <Text fontSize={'3xl'} fontWeight={'semibold'} as="h1">
          {title}
        </Text>
        <Text color={'gray.600'} fontSize={'sm'} as="p">
          {description}
        </Text>
      </Stack>
    </Stack>
  )
}

export function DashboardSubHeader({ title, description }: { title: string, description: string }) {
  return (
    <Stack as="header" spacing={1}>
      <Text as="h1"
        fontSize={'xl'}
        fontWeight={'semibold'}
      >
        {title}
      </Text>
      <Text as="p"
        color={'gray.600'}
        fontSize={'sm'}
      >
        {description}
      </Text>
    </Stack>
  )
}