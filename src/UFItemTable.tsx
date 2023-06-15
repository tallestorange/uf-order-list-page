import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UFItem } from './UFGoodsOrderType';
import { get_stocks_from_my_aws } from './UFGoodsOrderAPI';

function get_all_items_from_my_aws(on_get_items: (items: UFItem[]) => void)
{
  get_stocks_from_my_aws(items => {
    on_get_items(items);
  });
}

export const UFItemTable = () => {
  const [items, setItems] = useState<UFItem[]>([]);

  React.useEffect(() => {
    get_all_items_from_my_aws(newItems => {
      setItems([...items, ...newItems]);
    });
  }, []);
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
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