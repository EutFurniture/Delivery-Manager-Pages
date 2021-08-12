import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router-dom'
import { Form,Row,Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
     
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
  
    title: {
      flexGrow: 1,
    },
    
   
   
  }));

const styles = {
    
  updatebtn:{
    backgroundColor: '#9933CC',
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
    align:'right',
  },
  }

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function ViewProfile() {
  const { employee_id } = useParams();
  const [Dt, setDt] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/ViewDeliveryManager', {
          params: {
              employee_id: employee_id,  
          }
          
      });

      setDt(response.data[0]);
         console.log(response.data[0]);

  };
  fetchData();
}, [employee_id]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    
              <div>
              <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                    <strong> VIEW PROFILE</strong>
              </Typography>
              <br></br>
              <div >
               <Form >
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Employee ID :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                   {Dt.employee_id}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Full Name :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                  {Dt.e_name}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   NIC :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                  {Dt.e_nic}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Email :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                  {Dt.e_email} 
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Phone Number :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                   {Dt.e_phone} 
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Address :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                    {Dt.e_address} 
                  </Form.Label>
                  </Col>
              </Form.Group><br/>
              
              <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column lg={2} >
                   Job start Date :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                  {dateOnly(Dt.e_job_start_date)}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

              </Form> 
            <div align="right">
              <Link  style={styles.updatebtn} to={location=>`/EditProfileRoute/${Dt.employee_id}`} >  Edit Profile</Link>
            </div>
              </div>

              </div>
              
              
          
        
  );
}
