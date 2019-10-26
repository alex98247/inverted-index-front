import React from 'react';
import {Input, Button} from 'reactstrap';

class Finder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {texts: [], text: ''};
        this.handleFind = this.handleFind.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({text: event.target.value});
    }

    async handleFind() {
        let text = this.state.text;
        console.log(text);
        const response = await fetch('/api/invertedindex?word='+text, {
            mode: "no-cors"
        });
        console.log(response);
        const body = await response.json();
        console.log(body);
        this.setState({texts: body});
    }

    render() {
        return <div>
            <Input type="text" name="find" id="find" placeholder="with a placeholder" onChange={this.handleChange}/>
            <Button onClick={this.handleFind} color="danger">Find</Button>
        </div>;
    }
}

export default Finder;