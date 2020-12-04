
import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

class DataTable extends Component {






  





  render() {



    const ideas = this.props.ideas.map(idea => {
      return (
        <tr key={idea.id}>
          <th scope="row"> <Link to={ "/ideas/" + idea.id}>
            {idea.title}
          </Link>
          </th>
          <td>{idea.driver}</td>
        </tr>
        )
      })

      return (
        <Table borederless responsive hover>
          <thead>
            <tr> 
              <th>Title</th>
              <th>Driver</th>
            </tr>
          </thead>
          <tbody>
            {ideas}
          </tbody>
          <Button href="/add"className="mt-5" color="success" size="sm" > Add an idea</Button>
        </Table>
    );
  }
}

export default DataTable