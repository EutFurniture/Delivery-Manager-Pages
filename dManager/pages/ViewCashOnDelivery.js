import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';


class ViewCashOnDelivery extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/cashOnDelivery')
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
                  <th scope="col">Payable Amount</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Order</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.employee_id}</td>
                    <td>{record.total_price - record.advance_price}</td>
                    <td>{record.payment_status === "Paid" ? <Alert variant="success">Paid</Alert> : <Alert variant="secondary">Advance Paid</Alert>}</td>
                    <td>{record.o_status === "Completed" ? <Alert variant="success">Completed</Alert> : record.o_status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.o_status === "Pending" ? <Alert variant="secondary">Pending</Alert> : record.o_status}</td>                    
                    <td>
                      <Button variant="primary">Update</Button>{" "} 
                      <Button variant="info">View</Button>
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
    }
}

export default ViewCashOnDelivery;
