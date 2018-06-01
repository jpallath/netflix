import React, { Component } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import MainMovie from "./MainMovie";

const App = styled.div`
    margin: 0;
    padding: 0;
`;

const store = configureStore();

class Movie extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App className="App">
                        <Navigation />
                        <Route exact path="/" render={props => <MainMovie />} />
                        <Footer />
                    </App>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Movie;
