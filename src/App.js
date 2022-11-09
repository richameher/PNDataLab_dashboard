import './App.css';
import * as React from 'react';
import {Grid, Box, Toolbar, AppBar, IconButton, Typography, InputLabel, MenuItem, Select, FormControl, Checkbox, Button, FormGroup,FormControlLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ConfigAnalysis from './components/configanalysis';
import DashBar from './components/DashBar';
import Drevised from './components/Drevised';
import ScatterChart from './components/ScatterChart';

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

  <Drevised/>
  );
}

export default App;
