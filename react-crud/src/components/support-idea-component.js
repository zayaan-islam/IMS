
import React, {Component} from 'react';
import IdeaDataService from "../services/idea.service";


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
            currentIdea: -1,
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
                    ideas: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, ideas, currentIdea, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchTitle}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>ideas List</h4>
    
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
            <div className="col-md-5">
              {currentIdea ? (
                <div>
                  <h4>Idea</h4>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentIdea.title}
                  </div>
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
        



        
    
