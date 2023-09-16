import { FormControl, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiEnvelope, BiUser } from "react-icons/bi";

interface FormTextProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type: "email" | "text";
};

export default function FormText({ label, value, setValue, type }: FormTextProps) {
  return (
    <FormControl>
      <InputGroup size={'lg'}>
        <InputLeftElement alignItems={'center'} justifyContent={'center'} px={'2.5rem'}>
          {type === "text" ? (
            <Icon as={BiUser} color={'gray.400'} fontSize={'25px'} />
          ) : (
            <Icon as={BiEnvelope} color={'gray.400'} fontSize={'25px'} />
          )}
        </InputLeftElement>
        <Input
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fontSize={'16px'}
          pl={'4rem'}
          rounded={'xl'}
          _placeholder={{ color: 'gray.400' }}
          _hover={{ borderColor: 'gray.500' }}
          borderColor={'gray.400'}
          required
        />
      </InputGroup>
    </FormControl>
  )
}