import React from "react";
import {Grid,InputLabel, MenuItem, Select, FormControl} from '@mui/material';
import { FormGroup, Checkbox, FormControlLabel, Button, Box, Toolbar, AppBar, IconButton, Typography} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ScatterChart from './ScatterChart';

// const SERVER_URL = "http://timan103.cs.illinois.edu/PNDatalabServer";
const SERVER_URL="http://localhost:5000";

const pca_options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'PC1', //hardcoded , need to change it to axis labels coming from user
      },
    },
    x:{
      title: {
        display: true,
        text: 'PC2', //hardcoded , need to change it to axis labels coming from user
      },
    }
  },
  elements: {
    point:{
      pointStyle:'circle',
      radius: 5,
      hoverBorderWidth: 1,
    },

},
  plugins:{
    legend:{
      display: true,
    },
    title: {
        display: true,
        text: 'Principal Components'
    }
  },
};

const regression_options = {

  scales: {
    y: {

      title: {
        display: true,
        text: 'Predicted Outcome', //hardcoded , need to change it to axis labels coming from user
      },
      max: 1.2,
      min: -0.2,
           ticks: {
               stepSize: 1,
               callback: function(val, index) {
            // Hide every 2nd tick label
                  return index == 1 | index == 2  ? this.getLabelForValue(val) : '';
                }
           },
    },
    x:{
      title: {
        display: true,
        text: 'Probability', //hardcoded , need to change it to axis labels coming from user
      },
    }
  },
  elements: {
    point:{
      pointStyle:'circle',
      radius: 4,
      hoverBorderWidth: 1,
    },

},
  plugins:{
    legend:{
      display: true,
      title: {
        display: true,
        text:'True Label'
      }
    },
    title: {
        display: true,
        text: 'Predicted Outcome vs Probability'
    }
  },
};
export const data_results = {
  datasets: [
    {
      label: 'A dataset',
      data: [{
        'x': 0.5,
        'y': 0.3
      }, {x:2, y:2}, {x: 1.0, y: 1.0}],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

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
        accuracy:null,
        dataset_value: "", // stores dataset value chosen
        task_value:"", // stores task_value chosen
        disabled_dataset:false, // first allow only dataset selection
        disabled_task: true, // then allow task selection
        disabled_algo: true, // then allow algo selection
        loading: false, // loads when api call is made to run the algorithm on dataset
        columns: [], // stores columns from dataset
        column_x_checked: null, //store the checked x and y column for some algorithms
        column_y_checked: null,
        columns_checked: {}, // store the checked columns for PCA like algorithms
        disable_submit_button: false,
        set_checked_state: false,
        results:data_results,
        results_retrived: false
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
        xhr.open("GET", SERVER_URL+"/api/get_datasets");
        xhr.send();

    }

    handleChangeDatasets =(event)=>{
      this.setState({dataset_value: event.target.value,
                    tasks:[""], // reset task
                    disabled_task: false, // enable task
                    disabled_algo: true,
                    disable_submit_button: true,
                    task_value:"",
                    algorithm_value:"",
                    columns_checked:{} }); // disable algo and submit button
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

              } else {
                  let response = JSON.parse(xhr.responseText)
                  this.setState({errorFromServer: response.error});
              }
          }.bind(this);

          xhr.open("GET", SERVER_URL+"/api/get_columns_tasks/"+dataset_id);
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

            xhr.open("GET", SERVER_URL+"/api/get_algorithms/"+task_id);
            xhr.send();
        }

      getGraphData = (dataset_id, algorithm_id, columns_selected) => {
              var xhr = new XMLHttpRequest();

              xhr.onreadystatechange = function () {
                  // Only run if the request is complete
                  if (xhr.readyState !== 4) {
                      return;
                  }
                  if (xhr.status >= 200 && xhr.status < 300) {
                      let response = JSON.parse(xhr.responseText);

                      this.setState({results:response.data_results,results_retrived:true});

                      if (algorithm_id == 0){
                        this.setState({accuracy: JSON.stringify(response.accuracy.accuracy)});
                        this.setState({graph_options:regression_options});

                      }
                      else{
                        this.setState({accuracy: ""});
                        this.setState({graph_options:pca_options});
                      }

                      console.log(response);
                  } else {
                      let response = JSON.parse(xhr.responseText)
                      this.setState({errorFromServer: response.error});
                  }
              }.bind(this);
              xhr.open("POST", SERVER_URL+"/api/make_evaluation_graph");
              xhr.setRequestHeader('Content-Type', 'application/json');

              xhr.send(JSON.stringify({'data':{dataset_id: dataset_id,algorithm_id:algorithm_id, 'columns_selected': columns_selected}}));
      }

      handleChangeTask = (event) => {
        this.setState({task_value: event.target.value,
                      algorithms:[""], // reset task
                      disabled_algo: false, // enable task
                      disable_submit_button: false,
                      algorithm_value:""});
        this.getAlgorithms(event.target.value);

      }

      handleCheckBox = (event) => {
          // setState(event.target.checked);
          let copyColumnsChecked = this.state.columns_checked;
          copyColumnsChecked[event.target.value] = event.target.checked;
          this.setState({columns_checked:copyColumnsChecked});
  };

      handleChangeAlgo = (event) =>{
        this.setState({algorithm_value: event.target.value})

      }

      handleSubmit = () => {


         this.getGraphData(this.state.dataset_value, this.state.algorithm_value, this.state.columns_checked);
      }

  render(){
    let GraphContent;
    if (this.state.results_retrived){
      GraphContent = <ScatterChart options={this.state.graph_options} results={this.state.results} options={this.state.graph_options}></ScatterChart>
    }
    else{
      GraphContent = <div> </div>
    }
    let AccuracyContent;
    if (this.state.accuracy){
      AccuracyContent = <p style={{ border: 'None' }}>Accuracy {this.state.accuracy}</p>
    }
    else{
      AccuracyContent = <p style={{ border: 'None' }}></p>
    }

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
         </Grid>
         <Grid item md={3} lg={4} >
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
                  }} fullWidth disabled={this.state.disabled_task}>
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
                     <FormControlLabel key={column} value={column} onChange={this.handleCheckBox} control={
                     <Checkbox />
                     } label={column} />
                     ))}
                     </FormGroup>
                  </div>
                  <div style={{
                  margin: 'auto',
                  padding:'2em',
                  textAlign: 'right'
                  }}>
                  <Button onClick={this.handleSubmit} disabled={this.state.disable_submit_button} variant="contained">
                     <PlayCircleIcon/>
                     Submit
                  </Button>
            </div>
            </Item>
            </div>
         </Grid>
         <Grid item md={9} lg={8}>
            <Item>
               <div
               style={{
               width: '700px',
               height: '600px'
               }}
               >
               {GraphContent}

               </div>
            </Item>
            <Item>

              {AccuracyContent}

            </Item>
         </Grid>
      </Grid>
      </div>


    )
  }


}
