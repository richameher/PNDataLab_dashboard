import './App.css';
import * as React from 'react';
import {Grid, Box, Toolbar, AppBar, IconButton, Typography, InputLabel, MenuItem, Select, FormControl, Checkbox, Button, FormGroup,FormControlLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ConfigAnalysis from './components/configanalysis';
import DashBar from './components/DashBar';
import Drevised from './components/Drevised'

import { Chart } from 'react-charts'

function MyChart() {

}

const Item = styled(Paper)(({ theme }) => ({
  backgroundcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




function App() {




  return (

  <div style={{
    background: '#efefef'
  }}>
    <Grid container spacing={2}>
      <Grid item md={12} lg={12}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
        <div style={{
          margin: '10px'
        }}>


        </div>
      </Grid>

      <Grid item md={3} lg={4} >

        <Drevised/>



      </Grid>

      <Grid item md={9} lg={8}>
        <Item>

        <div
          style={{
            width: '700px',
            height: '600px'
          }}
        >

        </div>

        </Item>
      </Grid>



    </Grid>


  </div>
  );
}

export default App;
