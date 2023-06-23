import { useState, useEffect, useCallback, useReducer } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UFItemTable } from './UFItemTable';
import { UFItem } from './UFGoodsOrderType';
import { get_stocks_from_my_aws } from './UFGoodsOrderAPI';

import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

interface IAction {
  type: string;
  value?: UFItem[];
}

const reducer = (state: UFItem[], action: IAction) => {
  if (action.type === "reset") {
    return [];
  }
  else if (action.type === "update") {
    const result: UFItem[] = [...state, ...action.value!];
    return result;
  }
  else {
    return []
  }
};

function App() {
  const [items, setItems] = useReducer(reducer, []);
  const [updateDisabled, setUpdateDisabled] = useState<boolean>(false);

  const update_table = useCallback(() => {
    setUpdateDisabled(true);
    setItems({type: "reset"});
    get_stocks_from_my_aws(newItems => {
      setItems({type: "update", value: newItems});
      setUpdateDisabled(false);
    });
  }, [items]);

  useEffect(() => {
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
              disabled={updateDisabled}
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
