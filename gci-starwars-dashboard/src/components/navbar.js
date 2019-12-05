import React, { Component } from 'react'
import { AppBar, ListItemText } from '@material-ui/core';
import {List,ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './logo.png';
import { NavLink } from 'react-router-dom';
import { withTheme } from '@material-ui/styles';
import { border } from '@material-ui/system';

const styles = theme=> ({
    appBar: {
        paddingTop: '5px',
        paddingBottom: '5px',
        background: 'black',
    },

    menuButton: {
       
       padding: '10px',
       margin: '10px',
       color: 'black',
       backgroundColor: '#FFE81F',
       border: '2px white',
       "&:hover": {
        boxShadow: "10px 10px 10px #FFE81F",
        backgroundColor: 'black',
        color: '#FFE81F'
    }
    },
      title: {
        color: '#FFE81F',
        flexGrow: 1,
        textAlign: 'center',
    },
    logo:{
        width: '200px',
        height: '50px',
    }


})

export class navbar extends Component {
    render() {
        let { classes } = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>

                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <img src={logo} className={classes.logo}></img>
                    </IconButton>

                    <Typography variant="h4" className={classes.title}>
                        STARWARS DASHBOARD
                    </Typography>

                    <Button  className={classes.menuButton}  to="/people">
                        PEOPLE
                    </Button>

                    <Button color="default" className={classes.menuButton} component={NavLink} to="/people">
                        FILMS
                    </Button>
                    
                    <Button color="default" className={classes.menuButton} component={NavLink} to="/people">
                        VEHICLES
                    </Button>
                    
                    <Button color="default" className={classes.menuButton} component={NavLink} to="/people">
                        PLANETS
                    </Button>

                    <Button color="default" className={classes.menuButton} component={NavLink} to="/people">
                        STARSHIPS
                    </Button>

                    <Button color="default" className={classes.menuButton} component={NavLink} to="/people">
                        SPECIES
                    </Button>
                </Toolbar>
            </AppBar>
 
        )
    }
}

navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(navbar);
