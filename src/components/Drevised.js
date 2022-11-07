import React from "react";
import {InputLabel, MenuItem, Select, FormControl} from '@mui/material';
import { FormGroup, Checkbox, FormControlLabel, Button} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default class Drevised extends React.Component {
  constructor(props) {
      super(props);
      // load state from previous configuration
      this.state = {
        dashboard: null,
        tasks: ["None"],
        datasets:["None"],
        algorithms:["None"],
        algorithm:[""],
        dataset: [""],
        task:[""],
        disabled_one:false,
        loading: false,
        disabled_two: true,
        disabled_three: true,
        columns: [],
        submitEnable: false
      }
  }

  componentDidMount() {
        this.getConfigOptions();
    }

    getConfigOptions = () => {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
              // Only run if the request is complete
              if (xhr.readyState !== 4) {
                  return;
              }

              if (xhr.status >= 200 && xhr.status < 300) {
                  let response = JSON.parse(xhr.responseText);
                  console.log(response);
                  this.setState({datasets: response.datasets, algorithms:response.algorithms, tasks: response.tasks});
              } else {
                  let response = JSON.parse(xhr.responseText)
                  this.setState({errorFromServer: response.error});
              }
          }.bind(this);

          xhr.open("GET", "http://127.0.0.1:5000/api/dashboard");
          xhr.send();
      }

      getDataSetcolumns = () => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                // Only run if the request is complete
                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(xhr.responseText);
                    console.log(response);
                    this.setState({columns: response.columns});
                } else {
                    let response = JSON.parse(xhr.responseText)
                    this.setState({errorFromServer: response.error});
                }
            }.bind(this);

            xhr.open("GET", "http://127.0.0.1:5000/api/get_metadata");
            xhr.send();
        }

      handleChangeTask = (event) => {
        this.setState({task: event.target.value,
                      dataset:[""],
                      algorithm:[""],
                      disabled_two: false,
                      disabled_three: true, columns:[]})
      }

      handleChangeDatasets =(event)=>{
        this.setState({dataset: event.target.value,
                      algorithm:[""],
                      disabled_three: false});
        this.getDataSetcolumns();

      }

      handleChangeAlgo = (event) =>{
        this.setState({algorithm: event.target.value})

      }

  render(){
    return (
      <div>
      <Item>
      <FormControl style={{
        margin: '10px'
      }} fullWidth disabled={this.state.disabled_one}>
      <InputLabel id="selectlabel">Select Tasks</InputLabel>
      <Select
        labelid="selectlabel"
        value={this.state.task}
        label="Tasks"
        onChange={this.handleChangeTask}
      >
     <MenuItem value=""></MenuItem>
      {this.state.tasks.map((algorithm,idx) => (
        <MenuItem value={algorithm} key={idx}>{algorithm}</MenuItem>
      ))}
      </Select>
      </FormControl>

      <FormControl style={{
        margin: '10px'
      }} fullWidth disabled={this.state.disabled_two}>
      <InputLabel id="selectlabeld">Select Dataset</InputLabel>
      <Select
        labelid="selectlabeld"
        value={this.state.dataset}
        label="Dataset"
        onChange={this.handleChangeDatasets}
      >
     <MenuItem value=""></MenuItem>
      {this.state.datasets.map((dataset,idx) => (
        <MenuItem value={dataset} key={idx}>{dataset}</MenuItem>
      ))}
      </Select>
      </FormControl>

      <FormControl style={{
        margin: '10px'
      }} fullWidth disabled={this.state.disabled_three}>
      <InputLabel id="selectlabelA">Select Algorithm</InputLabel>
      <Select
        labelid="selectlabelA"
        value={this.state.algorithm}
        label="Algorithm"
        onChange={this.handleChangeAlgo}
      >
     <MenuItem value=""></MenuItem>
      {this.state.algorithms.map((dataset,idx) => (
        <MenuItem value={dataset} key={idx}>{dataset}</MenuItem>
      ))}
      </Select>
      </FormControl>
      </Item>

      <Item>
      <div >
      <InputLabel id="select-columns">Select columns</InputLabel>
      <FormGroup  labelid="select-columns" style={{
        margin: 'auto',
        height:'300px',
        'overflow-y': 'scroll'
      }} >
      {this.state.columns.map((column, idx) => (
        <FormControlLabel key={idx} control={<Checkbox />} label={column} />
      ))}
      </FormGroup>
      </div>

      <div style={{
        margin: 'auto',
        padding:'2em',
        textAlign: 'right'
      }}>  <Button disabled={this.state.submitEnable} variant="contained"><PlayCircleIcon/>Submit</Button>

      </div>
      </Item>




      </div>
    )
  }


}
