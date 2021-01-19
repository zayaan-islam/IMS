import React, { Component} from "react";
import { Switch, Route,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {  NavbarBrand,  Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./App.css";
import AuthService from "./services/auth.service";
import DataTable from "./components/ideas-list.component";
import AddIdea from "./components/add-idea.component";
import Idea from "./components/idea.component";
import SupportList from "./components/support-idea-component";
import IdeaInfo from "./components/idea-page";
import Register from "./components/register.component";
import Login from "./components/login-component";

//Sets up the navbar for the application

export default class App extends Component {
  //State variables for user, checks whether there is an active user logged in along with togglign drop down menu for te navbar
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      currentUser: undefined,
      ideas: []

    };
  }
  //Function to open an close navbar dropdown items
  toggle(){
    this.setState({
      isOpen : !this.state.isOpen
    });
  }

  //Checks whether the user is logged in or not, and if the ideas from database were pulled
  componentDidMount(){
    const user = AuthService.getCurrentUser();

    if (user){ 
      this.setState({
        currentUser: user
      });
    
    
    }
    this.getIdeas()
  }
//Sets interval to refresh data from getIdeas function
  componentWillUnmount(){
    clearTimeout(this.intervalID);
    }
//Function to logout
  logOut(){
    AuthService.logout();
  }



//Funcion to pull all ideas from database to display on ideas-list component
 getIdeas(){
  fetch('http://localhost:8080/api/ideas')
  .then(response => response.json())
  .then(ideas => this.setState({ideas}))
  .catch(err => console.log(err))
  this.intervalID = setTimeout(this.getIdeas.bind(this), 5000)
}
  

//Renders navbar based on user status, if not logged in only displays log in and sign up
  render(){
    const {currentUser} = this.state;

    return (
      <container>
        <div>
        <Nav className="navbar navbar-expand navbar-dark">
          <NavbarBrand href="/" className="navbar-brand ml-4">
            Ideation
          </NavbarBrand>
          {currentUser ? (
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {currentUser.username}
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem href={"/ideas"}>
                    View Ideas
                  </DropdownItem>
                  <DropdownItem href={"/saved"}>
                    Saved Ideas
                  </DropdownItem>
                  <DropdownItem href={"/add"}>
                    Submit an Idea
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem href={"/login"} onClick={this.logOut}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          ) : (
            <Nav className="navbar-nav ml-auto">
              <NavItem>
                <NavLink href={"/login"}>
                  Login
                </NavLink>
              </NavItem>

              <NavItem className="nav-item">
                <NavLink href={"/register"}>
                  Sign Up
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Nav>
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
            <Route exact path ="/login">
              <Login/>
            </Route>
            <Route path="/ideas/:id" component={IdeaInfo} />
          </Switch>
        </div>
      </div>
        
      </container>

    );
  }
}

