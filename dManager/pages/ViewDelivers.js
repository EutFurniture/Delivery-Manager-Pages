import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Axios from 'axios'
import { Link } from "react-router-dom";

const styles = {
  viewbtn:{
  backgroundColor: '#33b5e5',
  width: '200px',
  textDecoration: 'none',
  height: '100px',
  marginRight: '5px',
  fontSize: '17px',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '5px',
  paddingBottom: '5px',
  color: 'white',
  borderRadius: '7px',
},
deletebtn:{
  backgroundColor: '#CC0000',
  width: '200px',
  textDecoration: 'none',
  height: '100px',
  marginRight: '5px',
  fontSize: '17px',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '5px',
  paddingBottom: '5px',
  color: 'white',
  borderRadius: '7px',
},
editbtn:{
  backgroundColor: '#ffbb33',
  width: '200px',
  textDecoration: 'none',
  height: '100px',
  marginRight: '5px',
  fontSize: '17px',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '5px',
  paddingBottom: '5px',
  color: 'white',
  borderRadius: '7px',
},
}

class ViewDelivers extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/delivers')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result
        });
      });
  }

  

    render(){
      const deleteDeliverPerson =(employee_id)=>{
        Axios.delete(`http://localhost:3001/deleteDeliver/${employee_id}`);
      }
      
     return(
        
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                  <th>Action</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.employee_id}</th>
                    <td>{record.e_name}</td>
                    <td>{record.e_nic}</td>
                    <td>{record.e_phone}</td>
                    <td>{record.e_email}</td>
                    
                    <td>
                    <Link style={styles.viewbtn} to={location=> `/DeliverInfoRoute/${record.employee_id}`}> View </Link>
                    <Link style={styles.editbtn} to={location=> `/EditDeliversRoute/${record.employee_id}`}> Edit </Link>
                    <Link style={styles.deletebtn} onClick={()=>{deleteDeliverPerson(record.employee_id)}}>Delete</Link>
                    </td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
          
     )
    }
}

export default ViewDelivers;
