import React from "react"

export default class Analysis extends React.Component {
    constructor(props) {
        super(props);
        // load state from previous configuration
    }

    render() {
       return <h1>Hello, {this.props.name[0]}</h1>;

    }
}
