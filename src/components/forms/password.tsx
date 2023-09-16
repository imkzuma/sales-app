import { useState } from "react";
import { Button, FormControl, Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { BiLock } from "react-icons/bi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface FormPasswordProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

export default function FormPassword({ label, value, setValue }: FormPasswordProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <FormControl>
      <InputGroup size={'lg'}>
        <InputLeftElement alignItems={'center'} justifyContent={'center'} px={'2.5rem'}>
          <Icon as={BiLock} color={'gray.400'} fontSize={'25px'} />
        </InputLeftElement>
        <Input
          pl='4rem'
          value={value}
          type={show ? 'text' : 'password'}
          onChange={(e) => setValue(e.target.value)}
          fontSize={'16px'}
          rounded={'xl'}
          placeholder={label}
          _placeholder={{ color: 'gray.400' }}
          _hover={{ borderColor: 'gray.500' }}
          borderColor={'gray.400'}
          required
        />
        <InputRightElement width='4.5rem'>
          <Button variant={'unstyled'} h='1.75rem' size='sm' onClick={() => setShow(!show)}>
            {show ? (
              <ViewIcon color={'#BFC9D9'} fontSize={'20px'} />
            ) : (
              <ViewOffIcon color={'#BFC9D9'} fontSize={'20px'} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}