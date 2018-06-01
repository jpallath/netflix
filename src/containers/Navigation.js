import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import DropDownMenu from "../components/DropDownMenu";

const Header = styled.header`
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #000;
    position: fixed;
    width: 100%;
    z-index: 1000;
`;

const Nav = styled.nav`
    display: flex;
    list-style: none;
    justify-content: flex-end;
    align-items: center;
    width: 25%;
`;

const Logo = styled.div`
    width: 20%;
    display: flex;
    * {
        margin: 5px;
    }
`;

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popMovies: [],
            showMenu: "hidden"
        };
        this.getPopMovies = this.getPopMovies.bind(this);
        this.triggerMenu = this.triggerMenu.bind(this);
        this.changeMovie = this.changeMovie.bind(this);
    }

    componentDidMount() {
        this.getPopMovies(this.props.movieId);
    }
    getPopMovies = async value => {
        let res = await axios.get(
            `${this.props.link}popular${this.props.stash}`
        );
        this.setState({ popMovies: res.data.results });
    };

    triggerMenu = () => {
        let newState = this.state.showMenu === "hidden" ? "shown" : "hidden";
        this.setState({ showMenu: newState });
    };

    changeMovie = id => {
        this.props.dispatch({ type: "CHANGE_MOVIE", movieId: id });
        this.triggerMenu();
    };
    render() {
        let { popMovies } = this.state;
        return (
            <Header>
                <StyledLink to="/">
                    <Logo>
                        {" "}
                        <i className="fa fa-2x fa-film" aria-hidden="true" />
                        <h1>Flixa</h1>
                    </Logo>
                </StyledLink>
                <Nav>
                    <StyledLink to="/">
                        <li className="button is-primary is-inverted">Home</li>
                    </StyledLink>
                    <DropDownMenu
                        popMovies={popMovies}
                        showMenu={this.state.showMenu}
                        triggerMenu={this.triggerMenu.bind(this)}
                        changeMovie={this.changeMovie.bind(this)}
                    />
                </Nav>
            </Header>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        movieId: reduxState.movies.movieId,
        link: reduxState.movies.link,
        stash: reduxState.movies.stash
    };
}

export default connect(mapStateToProps)(Navigation);
