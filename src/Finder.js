import React from 'react';
import {Input, Button, InputGroup} from 'reactstrap';

class Finder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {texts: [], text: ''};
        this.handleFind = this.handleFind.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    async handleFind() {
        let words = this.state.text.trim().replace(/\s/g, ',').replace(/\s/g, '');
        await fetch('/api/invertedindex?words=' + words).then(async data => this.setState({texts: await data.json()}));
    }

    render() {
        let texts = this.state.texts;
        let list = texts.map(text => <li><p align="justify">{text.text}</p></li>)
        return <div class="text">
            <h3>Простой поисковик</h3>
            <InputGroup>
                <Input type="text" name="find" id="find" placeholder="Введите слово, например IT" onChange={this.handleChange}/>
                <Button className={'but'} onClick={this.handleFind} color="danger">Find</Button>
            </InputGroup>
            <ul>
                {list}
            </ul>
        </div>;
    }
}

export default Finder;