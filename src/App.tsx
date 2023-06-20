import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UFItemTable } from './UFItemTable';
import { UFItem } from './UFGoodsOrderType';
import { get_stocks_from_my_aws } from './UFGoodsOrderAPI';

import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

function get_all_items_from_my_aws(on_get_items: (items: UFItem[]) => void)
{
  get_stocks_from_my_aws(items => {
    on_get_items(items);
  });
}

function App() {
  const [items, setItems] = useState<UFItem[]>([]);
  const update_table = () => {
    setItems([]);
    console.log("loading")
    get_all_items_from_my_aws(newItems => {
      setItems([...items, ...newItems]);
    });
  };

  React.useEffect(() => {
    update_table();
  }, []);

  return (
    <div className="App">
      <Box>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              UFGoodsOrder在庫数チェック
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={update_table}
            >
              <RefreshIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <UFItemTable items={items}/>
    </div>
  );
}

export default App;
