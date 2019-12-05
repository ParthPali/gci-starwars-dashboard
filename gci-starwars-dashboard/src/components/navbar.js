import React, { Component } from 'react'
import { AppBar } from '@material-ui/core';
import {List,ListItem } from '@material-ui/core';
export class navbar extends Component {
    render() {
        return (
            <AppBar>
                <List>
                    <ListItem>1</ListItem>
                    <ListItem>2</ListItem>
                </List>
            </AppBar>
        )
    }
}

export default navbar
