
import React, {Component} from 'react';
import IdeaDataService from "../services/idea.service";
import "./support-idea.css";


export default class SupportList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveIdeas = this.retrieveIdeas.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveIdea = this.setActiveIdea.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials : [],
            currentIdea : null,
            currentIndex: -1,
            searchTitle: ""

        };

    }
    componentDidMount(){
        this.retrieveIdeas();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveIdeas(){
        IdeaDataService.getAll()
            .then(response => {
                this.setState({
                    ideas: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveIdeas();
        this.setState({
            currentIdea: null,
            currentIndex: -1
        });
    }

    setActiveIdea(idea, index) {
        this.setState({
            currentIdea: idea,
            currentIndex: index
        });
    }

    searchTitle(){
        IdeaDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    ideas: response.data,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { ideas, currentIdea, currentIndex } = this.state;
        return (
          <div className="list row">
            <div className="col-md-6 mt-3">
              <h4 align="center" >Saved Ideas</h4>
              <ul className="list-group">
                {ideas &&
                  ideas.map((idea, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveIdea(idea, index)}
                      key={index}
                    >
                      {idea.title}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-5 ml-5 mt-5">
              {currentIdea ? (
                <div>
                  <h4 align="center">{currentIdea.title}</h4>
                  <div>
                    <label className="mt-3">
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentIdea.description}
                  </div>
                  <div>
                    <label className="mt-5">
                      <strong>Driver:</strong>
                    </label>{" "}
                    {currentIdea.driver}
                  </div>
                  <div>
                    <label className="mt-3">
                      <strong>Risk:</strong>
                    </label>{" "}
                    {currentIdea.risk}
                  </div>
                  <button className="btn-xs btn-success mt-5 mb-3" >Fund Idea</button>
                  <button className="btn-xs btn-danger mt-5 ml-5 mb-3" >Remove Idea</button>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Idea...</p>
                </div>
              )}
            </div>
          </div>
          
        );
      }
    }
        



        
    
