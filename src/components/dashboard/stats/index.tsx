import StatLineChart from "@/components/chart/StatLine";
import { Box, Flex, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

const datas = [
  { id: 1, label: 'Total Users', value: 6500, increase: true, decrease: false, percent: 23.4 },
  { id: 2, label: 'Total Orders', value: 2300, increase: false, decrease: true, percent: 8.2 },
  { id: 3, label: 'Total Sales', value: 4600, increase: true, decrease: false, percent: 34.6 },
  { id: 4, label: 'Total Revenue', value: 7800, increase: true, decrease: false, percent: 45.6 },
];

export default function StatsDashboard() {
  return (
    <Flex gap={3} flexWrap={'wrap'} w='full'>
      {datas.map((item, index) => (
        <Stat key={index}
          border={'1px'}
          borderColor={'gray.300'}
          h={32}
          py={5}
          px={5}
          rounded={'lg'}
          bg={'teal.100'}
          pos='relative'
        >
          <StatLabel>{item.label}</StatLabel>
          <StatNumber>{item.value}</StatNumber>
          <StatHelpText>
            <StatArrow type={item.increase ? 'increase' : 'decrease'} />
            {item.percent}%
          </StatHelpText>
          <Box
            pos="absolute"
            right={0}
            bottom={0}
          >
            <StatLineChart w={200} h={80} />
          </Box>
        </Stat>
      ))}
    </Flex>
  )
}