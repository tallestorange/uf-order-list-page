import React, { ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import { StringLiteral } from 'typescript';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

type UFResponse<T> = {
  statusCode: number;
  data: UFData<T>;
}

type UFData<T> = {
  result: number;
  contents: T;
}

type UFEvent = {
  event_color: string;
  event_date_display_text: string;
  event_day: string;
  event_day_of_week: string;
  event_month: string;
  event_open_day: string;
  event_open_hours: string;
  event_open_minutes: string;
  event_open_month: string;
  event_open_setting_flag: number;
  event_open_year: string;
  event_start_day: string;
  event_start_hours: string;
  event_start_minutes: string;
  event_start_month: string;
  event_start_setting_flag: number;
  event_start_year: string;
  event_time_display_text: string;
  event_url: string;
  event_year: string;
  id: number;
  name: string;
  testdata_flag: number;
  venue: string;
};

type UFItem = {
  id: number;
  code: string;
  name: string;
  abbreviation: string;
  category: string;
  image_urls: string[];
  discount_flag: number;
  have_size_flag: number;
  have_stock_flag: number;
  stock_remaining: number;
  display_order: number;
  kbn_item_class: number;
  new_icon_display_flag: number;
  artistCode: string;
  artist: string;
  price: number;
  order_limit_flag: number;
  order_limit: number;
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>商品名</TableCell>
            <TableCell align="right">値段</TableCell>
            <TableCell align="right">在庫数</TableCell>
            <TableCell align="right">1会計購入上限</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
          {/* <ItemCell></ItemCell> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ItemCell: React.FC<{ item: UFItem; }> = (props) =>
(
  <TableRow
    key={"a"}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {props.item.name}
    </TableCell>
    <TableCell align="right">{props.item.price}</TableCell>
    <TableCell align="right">{props.item.stock_remaining}</TableCell>
    <TableCell align="right">{props.item.order_limit}</TableCell>
  </TableRow>
);

async function get_all_stocks(): Promise<UFItem[]>
{
  let results: UFItem[] = [];
  const events = await get_events();
  for (const event of events) {
    const stocks = await get_stocks(event.id);
    for (const stock of stocks) {
      results.push(stock)
    }
  }
  return results;
}

function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            在庫数チェック
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

async function get_events(): Promise<UFEvent[]> {
  const url = 'http://dcf-order-app-prod-web-api-elb-1380278707.ap-northeast-1.elb.amazonaws.com//get-events';
  const response = await axios.post<UFResponse<UFEvent[]>>(url);
  const events = response.data.data.contents;
  return events;
}

async function get_stocks(eventId: number): Promise<UFItem[]> {
  const url = 'http://dcf-order-app-prod-web-api-elb-1380278707.ap-northeast-1.elb.amazonaws.com//get-eventitems';
  const params = new URLSearchParams();
  params.append('eventId', eventId.toString());
  params.append('includeSoldOutFlag', '1');
  params.append('sizeGroupingFlag', '1');

  const response = await axios.post<UFResponse<UFItem[]>>(url, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  const events = response.data.data.contents;
  return events;
}

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <BasicTable></BasicTable>
    </div>
  );
}

export default App;
