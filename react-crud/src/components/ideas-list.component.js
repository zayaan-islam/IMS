import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';


class DataTable extends Component {


      




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

        <Button  href="/add" className="mt-5"color="success"> Add an Idea</Button>
      </Table>
    )
  }
}

export default DataTable