import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme=> ({
    card:{
        margin: '10px',
        color: '#FFE81F',
        backgroundColor: 'black'
    },
    name:{

        borderBottom: '2px white'
    }
});


export class Person extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

            person: null
            
        }
    }

    
    render() {

        let { classes } = this.props;

        return (
            <div>
            <Grid container>
            
            {(() => {
                if (this.props.people == null) {
                return (
                    <h1>Loading</h1>
                )
            
                } else {
                return (
                    this.props.people.map(person => (

                        <Grid item sm={2}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
                                            {person.name}
                                        </Typography>
                                                          
                                        <List style={{color: 'white'}}>
              
                                                <ListItem>
                                                    <ListItemText>Birth Year: {person.birth_year}</ListItemText>
                                                </ListItem>
            
                                                <ListItem>
                                                    <ListItemText>Gender: {person.gender}</ListItemText>
                                                </ListItem>
            
                                                <ListItem>
                                                    <ListItemText>Eye Color: {person.eye_color}</ListItemText>
                                                </ListItem>
            
                                                <ListItem>
                                                    <ListItemText>Skin Color: {person.skin_color}</ListItemText>
                                                </ListItem>
            
                                                <CardActions>
                                                    <Button size="small" style={{color: '#FFE81F'}}>
                                                    Know More
                                                    </Button>
                                                </CardActions>
            
                                        </List>
                                    </CardContent>
                                </CardActionArea>
                                    
                                    
                            </Card>
                        </Grid>
                        ))
                )
                }
            })()}
            
            
            </Grid>
            </div>
        )
    }
}

Person.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Person);