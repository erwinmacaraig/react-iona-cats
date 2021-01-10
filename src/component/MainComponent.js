import React from 'react';

import Home from './HomeComponent';
import CatDetails from './CatDetails';

import {Switch, Route, withRouter } from 'react-router-dom';



class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact  path='/' component={Home} />
                <Route path='/:id' component={CatDetails} />
            </Switch>
        );
    }
    
}

export default withRouter(Main);