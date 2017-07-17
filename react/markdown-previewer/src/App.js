import React, { Component } from 'react';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

class Raw extends React.Component {
    constructor(props) {
        super(props);
        let initialRaw = 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[António Almeida](https://antonioalmeida.me)*';

        let initialProcessed = marked(initialRaw);
        this.state = {
            raw: initialRaw,
            markdown: initialProcessed,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let processed = marked(event.target.value);
        this.setState({
            raw: event.target.value,
            markdown: processed,
        });
        console.log(this.state.value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <textarea className="Text-area" value={this.state.raw} onChange={this.handleChange}></textarea>
                </div>
                <div className="col-md-6 text-left">
                    <span dangerouslySetInnerHTML={ {__html: this.state.markdown}} />
                </div>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <a href="https://antonioalmeida.me"><img src={logo} className="App-logo" alt="logo" /></a>
                    <h2>Markdown Previewer</h2>
                </div>
                <div className="container">
                    <Raw />
                </div>
            </div>
        );
    }
}

export default App;
