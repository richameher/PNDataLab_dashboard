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

export const options = {
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



export default class ScatterChart extends React.Component {
    constructor(props) {
        super(props);
        // load state from previous configuration
    }


    render() {

       return <Scatter options={options} data={this.props.results} />;;

    }
}
