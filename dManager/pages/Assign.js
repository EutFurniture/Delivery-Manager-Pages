import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};


class Assign extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/Assign')
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
                  <th scope="col">OrderId</th>
                  <th scope="col">Last Date</th>
                  <th scope="col">Ship To</th>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{dateOnly(record.order_last_date)}</td>
                    <td>{record.c_address}</td>
          
                    <td>
                        <Form >
                        <Form.Group as={Row} controlId="formHorizontalID">
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Deliver Id"  />
                        </Col>
                        </Form.Group><br/>
                        </Form>
                    </td>
                    <td>
                      <Button variant="primary">Assign</Button>{' '}
                      <Button variant="warning">Edit</Button>{' '}</td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
    }
}

export default Assign;
