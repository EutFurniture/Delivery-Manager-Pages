import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import axios from "axios";
//import user1 from '../../../assets/user1.png'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useParams} from 'react-router-dom'

import { mainListItems, Logout, Profile } from './listItems';


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
  userimage : {
    height: 60,
    width: 60,
    borderRadius:100,
    borderColor:'white',

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
    
  },
 
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignContent:'center',
    align:'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },

  formrow:{
  gridTemplateColumns:'1fr 3fr',
  display:'flex'
  },
  formleft:{
    width:'200px',
    marginTop:'20px',
    marginBottom:'30px',
    marginLeft:'20px'
  },
  formright1:{
    width:'800px',
    marginTop:'10px',
    marginBottom:'20px'
  },
  formlabel1:{
    marginBottom:'32px',
    fontSize:'16px', 
},

twocolumn:{
    gridTemplateColumns:'1fr 2fr', 
    display:'flex',
},
columnleft:{
    width:'300px',
    // backgroundColor:'rgb(63, 111, 199)'
},
columnright:{
width:'700px'
},

 datas:{
    marginBottom:'20px',   
 },
 user1:{
     width:'100px',
     height:'100px',
     marginTop:'20px',
     align:'center',
     marginLeft:'90px'
 }
}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};


export default function DeliverInfo() {
  const { employee_id } = useParams();
  const [Dt, setDt] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewDeliver', {
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37, 37, 94)'}}>
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
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37, 37, 94)', color:'white'}}>
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
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
     
      <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
        
        <Grid  container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
        
        <div >
           <Paper className={classes.paper}>
               <div className={classes.twocolumn}>
                   <div className={classes.columnleft}>
                        {/*<img src={user1} className={classes.user1} align='center'></img><br/><br/>*/}
                        <h3 align='center'>{Dt.e_name}</h3>
                        <h2 align='center' >{Dt.e_role}</h2>
                   </div>
                   <div style={{width:'3px',backgroundColor:'rgb(63, 111, 199)',height:'auto'}}></div>
             
            <div className={classes.columnright}>
            <Typography style={{fontSize:'30px',marginLeft:'20px'}} color="inherit" align="left" width="100%" noWrap className={classes.title}>
              <strong> PERSONAL INFORMATION </strong>
            </Typography>
                <div style={{fontSize:'20px',marginLeft:'20px'}}>
                <br/><p>Full Name: {Dt.e_name}</p>
                <p>Address: {Dt.e_address}</p>
                <p>NIC: {Dt.e_nic}</p>
                <p>Phone number: {Dt.e_phone}</p>
               </div>
            <Typography style={{fontSize:'30px',marginLeft:'20px'}} color="inherit" align="left" width="100%" noWrap className={classes.title}>
              <strong> JOB INFORMATION </strong>
            </Typography>
                <div style={{fontSize:'20px',marginLeft:'20px'}}>
                <br/><p>Employee ID: Emp{Dt.employee_id}</p>
                <p>Employee Role: {Dt.e_role}</p>
                <p>Job Start Date: {Dt.e_job_start_date}</p>
               </div>
            </div> 
            </div> 
          
          </Paper>
         
         </div>
        </Grid>

      </Grid>
          
        </Container>
      </main>
    </div>
  );
}
