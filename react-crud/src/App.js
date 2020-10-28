import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DataTable from "./components/ideas-list.component";
import AddIdea from "./components/add-idea.component";

class App extends Component {

  intervalID;

  state = {
      ideas : []
    }
    componentDidMount(){
      this.getIdeas()
    }

    componentWillUnmount(){
        clearTimeout(this.intervalID);
    }

  
    getIdeas(){
      fetch('http://localhost:8080/api/ideas')
        .then(response => response.json())
        .then(ideas => this.setState({ideas}))
        .catch(err => console.log(err))
        this.intervalID = setTimeout(this.getIdeas.bind(this), 5000)
    }



  render() {
    return (
      <container>
              <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand ml-4">
            Ideation
          </a>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/ideas"} className="nav-link">
                Ideas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>

            <Route exact path="/add">
              <AddIdea />
            </Route>
            <Route exact path="/ideas">
              <DataTable ideas={this.state.ideas}/>
            </Route>
          </Switch>
        </div>
      </div>
        
      </container>

    );
  }
}

export default App;