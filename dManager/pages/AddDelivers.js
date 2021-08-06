import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { mainListItems, Logout, Profile } from './listItems';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eut Furniture
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor:'#ede7f6'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignContent:'center',
    align:'center',
    
  },
  paper: {
    position:'relative',
    align:'center',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
   
  },
  fixedHeight: {
    height: 240,
  },
  
}));

const styles = {
  side:{
    backgroundColor:'rgb(37,37,94)',
  },
  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  ,
  button_style:{
    display:'flex',
    justifyContent:'space-between',
  }
  
};

const schema = yup.object().shape({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  NIC: yup.string().max(10, "Must be 10 Characters.").min(10, "Must be 10 Characters."),
  mobile: yup.string().required().min(8).max(15),
  cpassword: yup.string().when('password', (password, schema) => {
      if (password) return schema.required('Confirm Password is required');
  })
      .oneOf([yup.ref('password')], 'Passwords must match')
})

export default function AddDelivers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const[LoginStatus] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { register , handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

    const addDeliver = (data) => {
      Axios.post('http://localhost:3001/addDelivers', {
        fullname: data.fullname,
        NIC: data.NIC,
        email: data.email,
        address: data.address,
        mobile: data.mobile,
        password: data.password,
        cpassword: data.cpassword,

      }).then((response) => { 
        if(response.data.message){
          alert(response.data.message)
        }
      });
      console.log(data)
    };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37,37,94)'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <strong>DELIVERY MANAGER</strong>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={styles.side}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Profile}</List>
        <Divider />
        <Divider />
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
      
            {/* Recent Orders */}
            <Grid item xs={10} style={styles.pack} >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  width="100%" noWrap className={classes.title}>
              <strong>ADD NEW DELIVER PERSON</strong>
              </Typography><br/>

                 <Form onSubmit={handleSubmit(addDeliver)}>
                 <h5 className="d-flex bg-success fc-white  justify-content-center">{LoginStatus}</h5>
                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        Full Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" placeholder="Full Name" {...register('fullname')} required />
                        {errors.fullname?.message && <p className=" errormessage" >{errors.fullname?.message}</p>}                        
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalNIC">
                      <Form.Label column lg={2}>
                        National ID :
                      </Form.Label>
                      <Col>
                        <Form.Control type="text"  placeholder="National ID" {...register('NIC')} required/>
                        {errors.NIC?.message && <p className=" errormessage" >{errors.NIC?.message}</p>}
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column lg={2}>
                        Email :
                      </Form.Label>
                      <Col>
                        <Form.Control type="email" placeholder="Email" {...register('email')}  required />
                        {errors.email?.message && <p className=" errormessage" >{errors.email?.message}</p>}
                      </Col>
                    </Form.Group><br/>
                 
                    {/*<Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
                      <Form.Label column lg={2}>
                        Image :</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="file" 
                        onChange={(event)=> {
                          setImage(event.target.value);
                        }}/>
                      </Col>
                      </Form.Group>*/}


                    <Form.Group as={Row} controlId="formHorizontaladdress">
                      <Form.Label column lg={2}>
                        Address :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"  placeholder="Address" {...register('address')}  required/>
                        {errors.address?.message && <p className=" errormessage" >{errors.address?.message}</p>}
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalphone">
                      <Form.Label column lg={2}>
                        Mobile Number :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text"  placeholder="0761234565" {...register('mobile')} required />
                        {errors.mobile?.message && <p className=" errormessage" >{errors.mobile?.message}</p>}
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                      <Form.Label column lg={2}>
                        Password :
                      </Form.Label>
                      <Col>
                        <Form.Control type="password" placeholder="Password"  {...register('password')}  required />
                        {errors.password?.message && <p className=" errormessage" >{errors.password?.message}</p>}
                      </Col>
                    </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalcPassword">
                      <Form.Label column lg={2}>
                        Confirm Password :
                      </Form.Label>
                      <Col >
                        <Form.Control type="password" placeholder="Confirm Password"  {...register('cpassword')} required />
                        {errors.cpassword?.message && <p className=" errormessage" >{errors.cpassword?.message}</p>}
                      </Col>
                    </Form.Group><br/>                   

                    
                        <div  style={styles.button_style}>
                        <Button  type="submit" size='lg' href='/dManager/pages/ManageDelivers'>View All</Button>
                        <Button  type="submit" size='lg' >Add Deliver</Button>
                        </div>
           
                </Form>
            
              </Paper>
              </div>
            </Grid>
 
          </Grid>
          
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

