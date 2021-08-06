import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

class ViewPrioritize extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/getPriority')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result,
        });
      });
      
  }

    render(){
      //const { records } = this.state;
     return(
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Name</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">Last Date</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                  <tr>
                    <th scope="row">{record.employee_id}</th>
                    <td>{record.e_name}</td>
                    <td>{record.order_id}</td>
                    <td>{dateOnly(record.order_last_date)}</td>
                    <td>
                    <Form >
                        <Form.Group as={Row} controlId="formHorizontalPriority">
                        <Col sm={10}>
                            <Form.Control type="number" placeholder="Priority Number"  />
                        </Col>
                        </Form.Group><br/>
                    </Form>
                    </td>
                    <td>
                      <Button variant="success">OK</Button>{' '}
                      <Button variant="warning">Edit</Button>{' '}</td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
          
     )
    }
}

export default ViewPrioritize;
