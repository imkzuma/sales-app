import { Button, Icon, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function AuthGoogleButton() {
  return (
    <Button
      variant={'outline'}
      pos={'relative'}
      borderColor={"gray.400"}
      py={6}
      rounded={'xl'}
    >
      <Icon
        as={FcGoogle}
        pos={'absolute'}
        left={'2rem'}
        fontSize={'25px'}
      />
      <Text color={'#525867'}>
        Google
      </Text>
    </Button>
  )
}