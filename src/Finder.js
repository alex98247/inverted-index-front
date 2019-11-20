import React from 'react';
// eslint-disable-next-line no-unused-vars
import {Input, Button, InputGroup} from 'reactstrap';

class Finder extends React.Component {

    check = false;

    constructor(props) {
        super(props);
        this.state = {texts: [], text: ''};
        this.handleFind = this.handleFind.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(this.check);
        if (this.check === true) this.find(event.target.value);
        this.setState({text: event.target.value});
    }

    async find(string) {
        let words = string.trim().replace(/\s/g, ',').replace(/\s/g, '');
        let words1 = string.trim().split(/\s/g);
        await fetch('/api/invertedindex?words=' + words).then(async data => {
            var texts = await data.json();
            var trimText = [];
            for(var i=0; i<words1.length; i++) {
                trimText = trimText.concat(texts.map(text => text.text)
                    .flatMap(text => this.getMatches(words1[i], text).map(x => text.substring(x - 100, x + 100))));
            }
            console.log(trimText);
            this.setState({texts: trimText})
        });
    }

    async handleFind() {
        await this.find(this.state.text);
    }

    getMatches(needle, haystack) {
        var myRe = new RegExp("\\b" + needle + "\\b((?!\\W(?=\\w))|(?=\\s))", "gi"),
            myArray, myResult = [];
        while ((myArray = myRe.exec(haystack)) !== null) {
            myResult.push(myArray.index);
        }
        return myResult;
    }

    render() {
        let texts = this.state.texts;
        let list = texts.map(text => <li><p align="justify">{text}</p></li>)
        return <div class="text">
            <h3>Простой поисковик</h3>
            <InputGroup>
                <Input type="text" name="find" id="find" placeholder="Введите слово, например IT"
                       onChange={this.handleChange}/>
                <Button className={'but'} onClick={this.handleFind} color="danger">Find</Button>
            </InputGroup>
            <Input type="checkbox" onChange={(e) => {
                this.check = !this.check;
            }} type="checkbox"/>{' '}
            Поиск при изменении текста
            <ul>
                {list}
            </ul>
        </div>;
    }
}

export default Finder;