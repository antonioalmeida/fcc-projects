import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class CamperList extends React.Component {
    render() {
        const result = this.props.value.map((user, i) =>
            <Camper value={user} index={i} key={i}/>
        );

        return (<tbody>
            {result}
        </tbody>);
    }
}

class Camper extends React.Component {
    render() {
        let link = 'https://freecodecamp.org/' + this.props.username;
        return (
            <tr>
                <th>{this.props.index}</th>
                <td><a href={link}>{this.props.value.username}</a></td>
                <td>{this.props.value.recent}</td>
                <td>{this.props.value.alltime}</td>
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

        this.sortByAllTime = this.sortByAllTime.bind(this);
        this.sortByRecent = this.sortByRecent.bind(this);
        this.sortByUsername = this.sortByUsername.bind(this);
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

    sortByUsername() {
        let currentCampers = this.state.campers;

        currentCampers.sort(function(a,b) {
            var valueA = a.username;
            var valueB = b.username;

            if(valueA < valueB)
                return -1;
            if(valueA > valueB)
                return 1;

            return 0;
        });

        this.setState({campers: currentCampers});
        this.forceUpdate();
    }

    sortByAllTime() {
        let currentCampers = this.state.campers;

        currentCampers.sort(function(a,b) {
            var valueA = a.alltime;
            var valueB = b.alltime;

            if(valueA < valueB)
                return 1;
            if(valueA > valueB)
                return -1;

            return 0;
        });

        this.setState({campers: currentCampers});
        this.forceUpdate();
    }

    sortByRecent() {
        let currentCampers = this.state.campers;

        currentCampers.sort(function(a,b) {
            var valueA = a.recent;
            var valueB = b.recent;

            if(valueA < valueB)
                return 1;
            if(valueA > valueB)
                return -1;

            return 0;
        });

        this.setState({campers: currentCampers});
        this.forceUpdate();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src='https://www.freecodecamp.com/design-style-guide/downloads/glyph.png' className="App-logo" alt="logo" />
                    <h2>Camper Leaderboard</h2>
                </div>
                <div className="container">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th onClick={this.sortByUsername}><button type="button" className="btn btn-link">Username</button></th>
                                <th onClick={this.sortByRecent}><button type="button" className="btn btn-link">Last 30 days points</button></th>
                                <th onClick={this.sortByAllTime}><button type="button" className="btn btn-link">All time points</button></th>
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
