import React, {Component} from "react";
import {Card, CardBody, CardText} from "reactstrap";
import Search from "./assets/icons8-search.svg";
import Form from "./assets/form.svg";
import Fund from "./assets/fund.svg";
import "./idea.css";

//Landing page with links to the different pages of the system
export default class Idea extends Component {
    render() {
        return (
            <div className="flex-container">
            <Card className="create text-center">
              <CardBody>
              <a href="/add"> 
                <img className="form-img" src={Form} alt="search"/>
              </a>
              <CardText className="create-text">Share an Idea</CardText>
              </CardBody>
            </Card>
            <Card className="discover text-center">
              <CardBody>
              </CardBody>
              <a href="/ideas"> 
                <img className="search-img" src={Search} alt="search"/>
              </a>
              <CardText className="discover-text">Discover submitted Ideas</CardText>
            </Card>
            <Card className="support text-center">
              <CardBody>
              </CardBody>
              <a href="/saved"> 
                <img className="fund-img" src={Fund} alt="search"/>
              </a>
              <CardText className="fund-text">Fund an existing Idea</CardText>
            </Card>
            </div>

        )
        }
        
    }







