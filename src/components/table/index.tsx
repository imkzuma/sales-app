import { Badge, Button, Flex, Image, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface TableComponentProps {
  header: string[];
  data: any;
  page: number;
  setPage: any;
};

export default function TableComponent({ header, data, page, setPage }: TableComponentProps) {
  const router = useRouter();

  const handleViewProduct = async (id: number) => {
    router.push({
      pathname: '/dashboard/products/[id]',
      query: { id }
    })
  }

  const handlePrevPage = () => {
    if (page < 10) {
      setPage(0)
    }
    else {
      setPage(page - 10)
    }
  }

  const handleNextPage = () => {
    setPage(page + 10)
  }

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
              <Tr key={index} cursor={'pointer'} onClick={() => handleViewProduct(product?.id)}>
                <Td
                  w={'100px'} maxW={'100px'} minW={'100px'}
                  h={'100px'} maxH={'100px'} minH={'100px'}
                >
                  <Image
                    src={product?.thumbnail}
                    alt={product?.name}
                    objectFit={'cover'}
                  />
                </Td>
                <Td>{product?.title}</Td>
                <Td>{product?.brand}</Td>
                <Td>{product?.stock}</Td>
                <Td>${product?.price}</Td>
                <Td>
                  <Badge colorScheme="yellow">
                    {product?.rating}
                  </Badge>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {data && (
        <Flex justify={'space-between'} align={'center'} py={5}>
          <Text>
            Showing {page + 1} to {page + 10}
          </Text>
          <Flex gap={3}>
            <Button
              colorScheme="teal"
              onClick={handlePrevPage}
              isDisabled={page < 10}
            >
              Prev
            </Button>
            {Array.from({ length: 5 }, (_, i) => (
              <Button
                key={i}
                onClick={() => setPage(i * 10)}
                colorScheme={page === i * 10 ? 'teal' : 'gray'}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              colorScheme="teal"
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}
    </TableContainer>
  )
}