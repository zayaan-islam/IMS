import React, { Component } from "react";
import IdeaDataService from "../services/idea.service";
import {Button} from "reactstrap";


export default class AddTutorial extends Component {


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

  render() {
        return (
             <div className="submit-form clearfix">
            {this.state.submitted ? (
              <div>
                <h4 align="center">You submitted successfully!</h4>
                <button className="btn btn-success" onClick= { () => this.newIdea() }>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-title"> 
                <h1 className="mb-3" align="center"> Add a new Idea</h1> </div>
                <div className="form-group">
                  <label className="mt-3" htmlFor="title">Title for your idea</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>
    
                <div className="form-group">
                  <label className="mt-3" htmlFor="description">Description</label>
                  <textarea
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
                </div>

                <div className="form-group">
                  <label className="mt-3" htmlFor="driver">Driver</label>
                  <textarea
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
                </div>

                <div className="form-group">
                  <label className="mt-3" htmlFor="driver">Risk</label>
                  <textarea
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
                </div>
                
                <button  size="lg" onClick={this.saveIdea} className="btn btn-primary mt-3 mr-5">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
  }
}