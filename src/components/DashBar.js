import React from "react";
import ConfigAnalysis from './configanalysis';
import Checkcolumns from './checkcolumns.js'

export default class DashBar extends React.Component {
  constructor(props) {
      super(props);
      // load state from previous configuration
      this.state = {
        dashboard: null,
        tasks: ["None"],
        datasets:["None"],
        algorithms:["None"],
        loading: false,
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

  render(){
    return (
      <div>
      <ConfigAnalysis name={this.state.tasks} selectOption="Task" disabled={false}> </ConfigAnalysis>
      <ConfigAnalysis name={this.state.datasets} selectOption="Dataset" disabled={false}> </ConfigAnalysis>
      <ConfigAnalysis name={this.state.algorithms} selectOption="Algorithm" disabled={false}> </ConfigAnalysis>
      <Checkcolumns ></Checkcolumns>
      </div>
    )
  }


}
