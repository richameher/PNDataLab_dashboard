import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'PCA 1', //hardcoded , need to change it to axis labels coming from user
      },
    },
    x:{
      title: {
        display: true,
        text: 'PCA 2', //hardcoded , need to change it to axis labels coming from user
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
