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
    },
  },
  elements: {
    point:{
      pointStyle:'crossRot',
      borderColor:'blue',
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
