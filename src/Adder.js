import React from 'react';
import {Input, Button} from 'reactstrap';

class Adder extends React.Component {

    text = {
        text: ''
    };

    constructor(props) {
        super(props);
        this.state = {text: this.text};
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let text = {...this.state.text};
        text.text = event.target.value;
        this.setState({text: text});
    }

    async handleAdd() {
        const {text} = this.state;
        console.log(text);
        await fetch('/api/invertedindex?words=word1', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text),
            credentials: 'include'
        });
    }

    render() {
        return <div>
            <Input type="textarea" name="text" id="text" onChange={this.handleChange}/>
            <Button onClick={this.handleAdd} color="danger">Add</Button>
        </div>;
    }
}

export default Adder;