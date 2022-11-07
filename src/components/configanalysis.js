import React from "react"
import {InputLabel, MenuItem, Select, FormControl} from '@mui/material';


export default class ConfigAnalysis extends React.Component {
    constructor(props) {
        super(props);
        // load state from previous configuration
        this.state = {
          dashboard: null,
          algorithm: [""],
          disabled: false} // have a default value
    }


    handleChange = (event) => {
      this.setState({algorithm: event.target.value})
    }
// <h1>Hello, {this.props.name[0]}</h1>
    render() {
       return (
         <div>

         <FormControl style={{
           margin: '10px'
         }} fullWidth disabled={this.props.disabled}>
         <InputLabel id="selectlabel">Select {this.props.selectOption}</InputLabel>
         <Select
           labelid="selectlabel"
           value={this.state.algorithm}
           label={this.props.selectOption}
           onChange={this.handleChange}
         >
        <MenuItem value=""></MenuItem>
         {this.props.name.map((algorithm,idx) => (
           <MenuItem value={algorithm} key={idx}>{algorithm}</MenuItem>
         ))}
         </Select>
         </FormControl>
         </div>

       );

    }
}
