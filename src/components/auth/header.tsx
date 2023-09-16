import { Stack, Text } from "@chakra-ui/react";

interface AuthHeaderProps {
  title: string;
  description: string;
  href: string;
  link: string;
}

export default function AuthHeader({ title, description, href, link }: AuthHeaderProps) {
  return (
    <Stack as="header"
      textAlign={{ base: 'center' }}
      spacing={1}
    >
      <Text as="h1"
        color={"gray.600"}
        fontSize={'3xl'}
        fontWeight={'bold'}
      >
        {title}
      </Text>
      <Text as="p"
        color={"#40444E"}
        fontWeight={'500'}
      >
        {description} <Text as='a' href={href} color={"teal"}>{link}</Text>
      </Text>
    </Stack>
  )
}