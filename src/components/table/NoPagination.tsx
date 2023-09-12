import { Rupiah } from "@/utils/price";
import { Badge, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

interface TableComponentProps {
  header: string[];
  data: any;
};

export default function TableNoPagination({ header, data }: TableComponentProps) {
  return (
    <TableContainer>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            {header.map((item: string, index: number) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data === null && (
            <Tr>
              <Th py={10} colSpan={5} textAlign={'center'}>
                No Data
              </Th>
            </Tr>
          )}
          {data?.map((product: any, index: number) => {
            return (
              <Tr key={index}>
                <Td
                  w={'70px'} maxW={'70px'} minW={'70px'}
                  h={'70px'} maxH={'70px'} minH={'70px'}
                >
                  <Image
                    src={product?.thumbnail}
                    alt={product?.name}
                    objectFit={'cover'}
                  />
                </Td>
                <Td>{product?.title}</Td>
                <Td>{Rupiah.format(product?.price * 15000)}</Td>
                <Td>{product?.qty}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}