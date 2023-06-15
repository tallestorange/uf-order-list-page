import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UFItemTable } from './UFItemTable';

function App() {
  return (
    <div className="App">
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              UFGoodsOrder在庫数チェック
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <UFItemTable />
    </div>
  );
}

export default App;
