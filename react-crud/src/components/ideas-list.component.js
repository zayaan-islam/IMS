import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';


class DataTable extends Component {
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



    const ideas = this.props.ideas.map(idea => {
      return (
        <tr key={idea.id}>
          <th scope="row">{idea.title}</th>
          <td>{idea.description}</td>
          <td>{idea.driver}</td>
          <td>{idea.risk}</td>
        </tr>
        )
      })

    return (
      <Table boredered responsive hover>
        <thead>
          <tr> 
            <th>Title</th>
            <th>Description</th>
            <th>Driver</th>
            <th>Risks</th>
          </tr>
        </thead>
        <tbody>
          {ideas}
        </tbody>
      </Table>
    )
  }
}

export default DataTable