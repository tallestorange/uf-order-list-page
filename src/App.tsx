import { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UFItemTable } from './UFItemTable';
import { UFItem } from './UFGoodsOrderType';
import { get_stocks_from_my_aws } from './UFGoodsOrderAPI';

import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

function App() {
  const [items, setItems] = useState<UFItem[]>([]);
  const update_table = useCallback(() => {
    setItems([]);
    get_stocks_from_my_aws(newItems => {
      setItems([...items, ...newItems]);
    });
  }, [items]);

  useEffect(() => {
    setItems([]);
    get_stocks_from_my_aws(newItems => {
      setItems([...items, ...newItems]);
    });
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
