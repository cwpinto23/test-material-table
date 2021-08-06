import React, {lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
const TestFeatures = lazy(() => import( '../components/pages/TestFeatures'));


const Routes = ({location}) => (
    <main>
        <Switch>
        <Route location={location} path={"/"} exact component={TestFeatures}/>
        </Switch>
    </main>
);


export default Routes