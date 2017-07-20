import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class CamperList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
        }
    }

    componentDidMount() {
        const result = this.props.value.map((user, i) =>
            <Camper value={user} index={i} />
        );

        this.setState({result: result});
    }

    componentWillReceiveProps(nextProps) {
        const result = this.props.value.map((user, i) =>
            <Camper value={user} index={i} />
        );

        this.setState({result: result});
    }

    render() {
        return (<tbody>
            {this.state.result}
        </tbody>);
    }
}

class Camper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: props.index,
            username: props.value.username,
            recent: props.value.recent,
            alltime: props.value.alltime,
        };
    }


    render() {
        return (
            <tr>
                <th>{this.state.index}</th>
                <td>{this.state.username}</td>
                <td>{this.state.recent}</td>
                <td>{this.state.alltime}</td>
            </tr>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campers: []
        };

    }

    componentDidMount() {
        $.ajax({
            url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
            dataType: 'json',
            cache: false,
            success: function(data) {
                var users = data;
                this.setState({campers: users});
                this.forceUpdate();
                console.log("Success");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('https://fcctop100.herokuapp.com/api/fccusers/top/recent', status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Camper Leaderboard</h2>
                </div>
                <div className="container">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Points in the last 30 days</th>
                                <th>All time points</th>
                            </tr>
                        </thead>
                            <CamperList value={this.state.campers} />
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
