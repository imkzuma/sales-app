import { Button, Flex, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableComponentProps {
  header: string[];
  page?: number;
  setPage?: any;
  pagination: boolean;
  children: ReactNode;
};

export default function TableComponent({ header, page, setPage, pagination, children }: TableComponentProps) {
  const handlePrevPage = () => {
    if (page !== undefined && setPage !== undefined) {
      if (page < 10) {
        setPage(0)
      }
      else {
        setPage(page - 10)
      }
    }
  }

  const handleNextPage = () => {
    if (setPage !== undefined) {
      setPage((prevPage: number) => (prevPage ?? 0) + 10);
    }
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
          {children}
        </Tbody>
      </Table>
      {pagination && page !== undefined && (
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