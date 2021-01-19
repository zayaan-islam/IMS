import React, { Component } from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import IdeaDataService from "../services/idea.service";


//Componentfor idea submission form
export default class AddTutorial extends Component {

// Creates and sets state to read information from form and submit to database
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDriver = this.onChangeDriver.bind(this);
    this.onChangeRisk = this.onChangeRisk.bind(this);
    this.saveIdea = this.saveIdea.bind(this);
    this.newidea = this.newIdea.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      driver: "",
      published: false,

      submitted: false
    };
  }
//Binding title, description, driver, and risk form input to state variables created above
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDriver(e) {
    this.setState({
      driver: e.target.value
    });
  }

  onChangeRisk(e) {
    this.setState({
      risk: e.target.value
    });
  }


//Function to save the idea to the database
  saveIdea() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      driver: this.state.driver,
      risk: this.state.risk,
      published: true

    };

    IdeaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          driver: response.data.driver,
          risk: response.data.risk,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newIdea() {
    this.setState({
      id: null,
      title: "",
      description: "",
      driver: "",
      published: false,

      submitted: false
    });
  }

//Form for submitting ideas
  render() {
        return (
             <Form className="submit-form">
            {this.state.submitted ? (
              <div className="text-center">
                <h4 align="center">You submitted successfully!</h4>
                <Button className="btn btn-success mt-5" onClick= { () => this.newIdea() }>
                  Add
                </Button>
                <Button href="/ideas" color="primary" className="btn btn-primary mt-5 ml-5">
                  View Ideas
                </Button>
              </div>
            ) : (
              <Form className="submit-form">
                <div className="form-title"> 
                <h1 className="mb-3" align="center"> Add a new Idea</h1> </div>
                <FormGroup>
                  <Label className="mt-3" htmlFor="title">Title for your idea</Label>
                  <Input 
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </FormGroup>
    
                <FormGroup>
                  <Label className="mt-3" htmlFor="description">Description</Label>
                  <Input
                    type="textarea"
                    maxLength = "120"
                    className="form-control"
                    id="description"
                    placeholder = "Describe your idea (max: 120)"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="mt-3" htmlFor="driver">Driver</Label>
                  <Input
                    type="textarea"
                    maxLength ="50"
                    className="form-control"
                    id="driver"
                    placeholder = "Why do you think we need this? (max: 50)"
                    required
                    value={this.state.driver}
                    onChange={this.onChangeDriver}
                    name="driver"
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="mt-3" htmlFor="driver">Risk</Label>
                  <Input
                    type="textarea"
                    maxLength ="50"
                    className="form-control"
                    id="risks"
                    placeholder = "List any potential risks (max: 50)"
                    required
                    value={this.state.risk}
                    onChange={this.onChangeRisk}
                    name="risks"
                  />
                </FormGroup>
                <div className="text-center">
                <Button  color="primary" size="lg" onClick={this.saveIdea} className="mt-4">
                  Submit
                </Button>
                </div>
              </Form>
            )}
          </Form>
        );
  }
}