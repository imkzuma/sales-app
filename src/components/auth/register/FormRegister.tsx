import { useState } from "react";
import { Button, Divider, HStack, Stack, Text, VStack } from "@chakra-ui/react";

import FormPassword from "@/components/forms/password";
import FormText from "@/components/forms/text";
import AuthHeader from "@/components/auth/header";
import AuthGoogleButton from "@/components/auth/GoogleButton";

type FormsState = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function FormRegister() {
  const [forms, setForms] = useState<FormsState>({
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  return (
    <Stack as="section"
      w={{ base: 'full', md: 'sm' }}
      spacing={7}
    >
      <AuthHeader
        title="Register"
        description="Already have an account ?"
        href="/auth/login"
        link="Login"
      />

      <Stack as="form"
        spacing={7}
      >
        <VStack gap={2}>
          <FormText
            label="Input Username"
            value={forms.email}
            setValue={(value: string) => setForms({ ...forms, username: value })}
            type="text"
          />
          <FormText
            label="Input Email"
            value={forms.email}
            setValue={(value: string) => setForms({ ...forms, email: value })}
            type="email"
          />
          <FormPassword
            label="Input Password"
            value={forms.password}
            setValue={(value: string) => setForms({ ...forms, password: value })}
          />
          <FormPassword
            label="Password Confirmation"
            value={forms.password}
            setValue={(value: string) => setForms({ ...forms, password_confirmation: value })}
          />
        </VStack>

        <Button
          isDisabled={forms.email === '' || forms.password === '' || forms.username === '' || forms.password_confirmation === ''}
          rounded={'xl'}
          colorScheme="teal"
          size={'lg'}
          onClick={() => console.log(forms)}
        >
          Login
        </Button>
      </Stack>

      <Stack as="footer"
        spacing={6}
      >
        <HStack>
          <Divider bg={'gray.500'} h={'1px'} />
          <Text color={'gray.500'} whiteSpace="nowrap" px={2}>
            Or Login With
          </Text>
          <Divider bg={'gray.500'} h={'1px'} />
        </HStack>
        <AuthGoogleButton />
      </Stack>
    </Stack>
  )
}