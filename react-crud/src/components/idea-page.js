
import React, {Component} from "react";
import {Container, Col, Row, Progress, Button} from "reactstrap";
import IdeaDataService from "../services/idea.service";
import "./page.css"
export default class IdeaInfo extends Component{
    constructor(props){
        super(props);
        this.getIdea = this.getIdea.bind(this);

        this.state = {
            currentIdea: {
                id: null,
                title:"",
                description: "",
                risk:"",
                published: false

            },
            message: ""

        };
    }

    componentDidMount(){
        this.getIdea(this.props.match.params.id);
    }
    
    getIdea(id){
        IdeaDataService.get(id)
            .then(response => {
                this.setState({
                    currentIdea: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const { currentIdea } = this.state;

        return(
            <div>
                <Container className="container">
                <Row>
                <Col>
                    <div className="text">
                        <h1> {currentIdea.title} </h1>
                    </div>
                </Col>
                </Row>
                <Row>
                    <Col>
                    <div className="description">
                    <h2> {currentIdea.description} </h2>
                    </div>
                    </Col>

                    <Col>
                    <div className="fund">
                        <h3>33% of goal to fund idea </h3>
                        <Progress className="progress" animated color="#3742fa" value="33"/>    
                        <div className="buttons">
                        <Button size="sm" color="success"> Fund Idea</Button>
                        <Button className="ml-3" size="sm" color="primary"> Save Idea </Button>
                        </div>
                    </div>
                     </Col>
                </Row>
                <Row className="info">
                    <Col>
                    <div className="driver-text">
                            <h1> Driver  </h1>
                        </div>
                        <h2 className="mt-3 ml-3"> {currentIdea.driver} </h2>
                    </Col>
                    <Col className="ml-4">
                    <div className="risk-text">
                            <h1> Risk  </h1>
                        </div>
                    <div className="risk-box">
                     <h2 className="mt-3 ml-3"> {currentIdea.risk} </h2>
                    </div>
                    </Col>
                    </Row>
                </Container>
            </div>
        )
    }4
}