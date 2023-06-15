import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UFItemTable } from './UFItemTable';

import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

function App() {
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
            >
              <RefreshIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <UFItemTable />
    </div>
  );
}

export default App;
