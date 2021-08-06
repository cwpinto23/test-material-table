import React from 'react';
import TestRenderer from 'react-test-renderer';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import TestFeatures from "../components/pages/TestFeatures";


describe('Render Test', () => {
    global.URL.createObjectURL = jest.fn();
    it('renders without crashing', () => {
        global.URL.createObjectURL = jest.fn(() => 'details');
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <Switch>
                    <Route path="/" component={TestFeatures}/>
                </Switch>
            </MemoryRouter>
            , div);
    });
});
