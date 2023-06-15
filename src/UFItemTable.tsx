import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UFItem } from './UFGoodsOrderType';
import { get_events, get_stocks } from './UFGoodsOrderAPI';

function get_all_items(on_get_items: (items: UFItem[]) => void)
{
  get_events(events => {
    events.forEach(event => {
      get_stocks(event.id, items => {
        on_get_items(items);
      });
    });
  });
}

export const UFItemTable = () => {
  const [items, setItems] = useState<UFItem[]>([]);

  React.useEffect(() => {
    get_all_items(newItems => {
      setItems([...items, ...newItems]);
    });
  }, []);
  
  return (
    <div>
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
            {items.map(item => (
              <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.stock_remaining}</TableCell>
                <TableCell align="right">{item.order_limit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>            
    </div>
  );
}