import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {  NavbarBrand,  Nav } from 'reactstrap';
import "./App.css";
import DataTable from "./components/ideas-list.component";
import AddIdea from "./components/add-idea.component";
import Idea from "./components/idea.component";
import SupportList from "./components/support-idea-component";
import IdeaInfo from "./components/idea-page";
import Register from "./components/register.component";

export default class App extends Component {
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

  render(){
    return (
      <container>
        <div>
        <nav className="navbar navbar-expand navbar-dark">
          <NavbarBrand href="/" className="navbar-brand ml-4">
            Ideation
          </NavbarBrand>
          <Nav className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/ideas"} className="nav-link">
                Ideas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/saved"} className="nav-link">
                Saved
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </Nav>
        </nav>
        <div className="container mt-3">
          <Switch>
            
            <Route exact path="/">
              <Idea />
            </Route>
            <Route exact path="/add">
              <AddIdea />
            </Route>
            <Route exact path="/ideas">
              <DataTable ideas={this.state.ideas}/>
            </Route>
            <Route exact path="/saved">
              <SupportList/>
            </Route>
            <Route exact path ="/register">
              <Register/>
            </Route>
            <Route path="/ideas/:id" component={IdeaInfo} />
          </Switch>
        </div>
      </div>
        
      </container>

    );
  }
}

