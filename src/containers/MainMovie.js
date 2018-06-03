import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import Same from "./Same";

class MainMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: "",
            imdb_id: "",
            original_title: "",
            overview: "",
            poster_path: "",
            release_date: "",
            tagline: ""
        };
        this.getMovieDetails = this.getMovieDetails.bind(this);
        this.changeMovie = this.changeMovie.bind(this);
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(
            this
        );
    }

    componentDidMount() {
        this.getMovieDetails(this.props.movieId);
        this.setState({ movieId: this.props.movieId });
        this.hydrateStateWithLocalStorage();
    }

    changeMovie = id => {
        this.props.dispatch({ type: "CHANGE_MOVIE", movieId: id });
    };
    getMovieDetails = async id => {
        let res = await axios.get(`${this.props.link}${id}${this.props.stash}`);
        let {
            imdb_id,
            original_title,
            overview,
            poster_path,
            release_date,
            tagline
        } = res.data;
        this.setState({
            imdb_id: imdb_id,
            original_title: original_title,
            overview: overview,
            poster_path: poster_path,
            release_date: release_date,
            tagline: tagline
        });
        localStorage.setItem("movieId", id);
    };

    hydrateStateWithLocalStorage() {
        if (localStorage.getItem("movieId")) {
            let id = localStorage.getItem("movieId");
            this.changeMovie(id);
        }
    }

    componentDidUpdate() {
        if (this.state.movieId !== this.props.movieId) {
            this.getMovieDetails(this.props.movieId);
            this.setState({ movieId: this.props.movieId });
        }
    }

    render() {
        let {
            imdb_id,
            original_title,
            overview,
            poster_path,
            release_date,
            tagline
        } = this.state;
        let imdb_path = `https://www.imdb.com/title/${imdb_id}`;
        let imagePath = `http://image.tmdb.org/t/p/w500//${poster_path}`;
        return (
            <Container>
                <Main className="content">
                    <h1>{original_title}</h1>
                    <img src={imagePath} alt={imdb_id} />
                    <h3>{tagline}</h3>
                    <Summary>
                        Summary: {overview} <br /> <a href={imdb_path}>IMDB</a>
                    </Summary>
                    <h3>Released: {release_date}</h3>
                </Main>
                <Same changeMovie={this.changeMovie.bind(this)} />
            </Container>
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

export default connect(mapStateToProps)(MainMovie);

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Summary = styled.p`
    width: 50%;
    text-align: center;
`;

const Container = styled.div`
    position: relative;
    top: 10vh;
`;
