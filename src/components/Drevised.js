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
        tasks: ["None"], // store tasks loaded from API
        datasets:[], // store datasets loaded from API
        algorithms:["None"], // store algorithms loaded from API
        algorithm_value:"", // stores algorithm value chosen
        dataset_value: "", // stores dataset value chosen
        task_value:"", // stores task_value chosen
        disabled_dataset:false, // first allow only dataset selection
        disabled_task: true, // then allow task selection
        disabled_algo: true, // then allow algo selection
        loading: false, // loads when api call is made to run the algorithm on dataset
        columns: [], // stores columns from dataset
        column_x_checked: null, //store the checked x and y column for some algorithms
        column_y_checked: null,
        columns_checked: [], // store the checked columns for PCA like algorithms
        disable_submit_button: false
      }
  }

  componentDidMount() {
        this.getDatasets();
    }

    getDatasets = () => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          // Only run if the request is complete
          if (xhr.readyState !== 4) {
              return;
          }
          if (xhr.status >= 200 && xhr.status < 300) {
              let response = JSON.parse(xhr.responseText);
              // datasets are key value dictionary
              this.setState({datasets: response});
          } else {
              let response = JSON.parse(xhr.responseText)
              // notify if error
              this.setState({errorFromServer: response.error});
          }
        }.bind(this);
        xhr.open("GET", "http://127.0.0.1:5000/api/get_datasets");
        xhr.send();

    }

    handleChangeDatasets =(event)=>{
      this.setState({dataset_value: event.target.value,
                    tasks:[""], // reset task
                    disabled_task: false, // enable task
                    disabled_algo: true,
                    disable_submit_button: true,
                    task_value:"",
                    algorithm_value:"" }); // disable algo and submit button
      // console.log("Setting dataset value as:", event.target.value);
      // this.getDataSetcolumns(); // get dataset columns
      this.getColsandTasks(event.target.value);

    }

    getColsandTasks = (dataset_id) => {
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
              // Only run if the request is complete
              if (xhr.readyState !== 4) {
                  return;
              }

              if (xhr.status >= 200 && xhr.status < 300) {
                  let response = JSON.parse(xhr.responseText);

                  this.setState({columns: response.columns, tasks: response.tasks});
                  console.log(response);
              } else {
                  let response = JSON.parse(xhr.responseText)
                  this.setState({errorFromServer: response.error});
              }
          }.bind(this);

          xhr.open("GET", "http://127.0.0.1:5000/api/get_columns_tasks/"+dataset_id);
          xhr.send();
      }

      getAlgorithms = (task_id) => {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                // Only run if the request is complete
                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(xhr.responseText);

                    this.setState({algorithms: response.algorithms});
                    console.log(response);
                } else {
                    let response = JSON.parse(xhr.responseText)
                    this.setState({errorFromServer: response.error});
                }
            }.bind(this);

            xhr.open("GET", "http://127.0.0.1:5000/api/get_algorithms/"+task_id);
            xhr.send();
        }

      handleChangeTask = (event) => {
        this.setState({task_value: event.target.value,
                      algorithms:[""], // reset task
                      disabled_algo: false, // enable task
                      disable_submit_button: false,
                      algorithm_value:"" });
        this.getAlgorithms(event.target.value);

      }



      handleChangeAlgo = (event) =>{
        this.setState({algorithm_value: event.target.value})

      }

  render(){
    return (
      <div>
      <Item>

      <FormControl style={{
        margin: '10px'
      }} fullWidth disabled={this.state.disabled_dataset}>
      <InputLabel id="select-label-dataset">Select Dataset</InputLabel>
      <Select
        labelid="select-label-dataset"
        value={this.state.dataset_value}
        label="select-dataset"
        onChange={this.handleChangeDatasets}
      >

      {Object.keys(this.state.datasets).map((keyName, idx) => (
        <MenuItem value={keyName} key={keyName}>{keyName} | {this.state.datasets[keyName]}</MenuItem>
      ))}
      </Select>
      </FormControl>

      <FormControl style={{
        margin: '10px'
      }} fullWidth disabled={this.state.disabled_tasks}>
      <InputLabel id="select-label-task">Select Task</InputLabel>
      <Select
        labelid="select-label-task"
        value={this.state.task_value}
        label="select-task"
        onChange={this.handleChangeTask}
      >

      {Object.keys(this.state.tasks).map((keyName, idx) => (
        <MenuItem value={keyName} key={keyName}>{keyName} | {this.state.tasks[keyName]}</MenuItem>
      ))}
      </Select>
      </FormControl>

      <FormControl style={{
        margin: '10px'
      }} fullWidth disabled={this.state.disabled_algo}>
      <InputLabel id="select-label-algo">Select Algorithm</InputLabel>
      <Select
        labelid="select-label-algo"
        value={this.state.algorithm_value}
        label="select-algo"
        onChange={this.handleChangeAlgo}
      >

      {Object.keys(this.state.algorithms).map((keyName, idx) => (
        <MenuItem value={keyName} key={keyName}>{keyName} | {this.state.algorithms[keyName]}</MenuItem>
      ))}
      </Select>
      </FormControl>
      </Item>

      <Item>
      <div >
      <InputLabel id="select-columns">Select columns</InputLabel>
      <FormGroup  labelid="select-columns" style={{
        margin: 'auto',
        height:'300px'
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
