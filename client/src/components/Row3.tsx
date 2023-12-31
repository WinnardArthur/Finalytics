import { useMemo } from "react";
import DashboardBox from "./DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import BoxHeader from "./BoxHeader";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridCellParams } from "@mui/x-data-grid/models";
import FlexBetween from "./FlexBetween";
import { Cell, Pie, PieChart } from "recharts";
import Loader from "./Loader";

const Row3 = () => {
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: kpiData } = useGetKpisQuery();

  const { palette } = useTheme();

  const pieColors = [palette.primary[800], palette.primary[500]];

  // Pie Chart Data
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  // Product Columns
  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  // Transaction columns
  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        {productData ? (
          <Box
            mt=".5rem"
            p="0 0.5rem"
            height="75%"
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: `hidden`,
              },
            }}
          >
            <DataGrid
              rows={productData || []}
              columns={productColumns}
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
            />
          </Box>
        ) : (
          <Loader size={70} />
        )}
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        {transactionData ? (
          <Box
            mt="1rem"
            p="0 0.5rem"
            height="80%"
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: `hidden`,
              },
            }}
          >
            <DataGrid
              rows={transactionData || []}
              columns={transactionColumns}
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
            />
          </Box>
        ) : (
          <Loader size={80} />
        )}
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown by Category" sideText="+2%" />
        <FlexBetween mt="0rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart
                width={110}
                height={100}
                margin={{ top: 0, bottom: 10 }}
              >
                <Pie
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5" sx={{ mt: "-1rem" }}>
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+3.8%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[500]}
            borderRadius="1rem"
            width="40%"
          ></Box>

          <Typography margin="0 .5rem" variant="h6" width="100%">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            dolorum repellendus laboriosam ut perferendis accusamus earum, atque
            nobis veritatis. Aliquid praesentium facilis quisquam quae mollitia.
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
