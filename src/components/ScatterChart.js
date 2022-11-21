import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend,Title);



export default class ScatterChart extends React.Component {
    constructor(props) {
        super(props);
        // load state from previous configuration
    }


    render() {

       return <Scatter options={this.props.options} data={this.props.results} />;

    }
}
