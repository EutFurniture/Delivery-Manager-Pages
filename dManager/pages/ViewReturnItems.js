import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

class ViewReturnItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/viewReturn')
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
                  <th scope="col">DeliverId</th>
                  <th scope="col">Return Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Reschedule</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.employee_id}</td>
                    <td>{dateOnly(record.return_date)}</td>
                    <td>{record.reason}</td>
                    <td>{record.reschedule_date === "0000-00-00" ?
                        <Form >
                        <Form.Group as={Row} controlId="formHorizontaldate">
                        <Col sm={10}>
                            <Form.Control type="date"/>
                        </Col>
                        </Form.Group><br/>
                        </Form> : dateOnly(record.reschedule_date) }
                    </td>
                    <td>{record.return_status === "" ? <Alert variant="danger">Not completed</Alert> : record.return_status }</td>
                    <td>
                      <Button variant="success">Reschedule</Button>{" "} 
                      <Button variant="primary">Update</Button>
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
    }
}

export default ViewReturnItem;
