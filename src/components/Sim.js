import React, { Component } from "react";
import styled from "styled-components";

class Sim extends Component {
    constructor(props) {
        super(props);
        this.clickedMovie = this.clickedMovie.bind(this);
    }
    clickedMovie = id => {
        this.props.movieFlow(id);
    };
    render() {
        let { poster_path, original_title, id } = this.props;
        let imagePath = `http://image.tmdb.org/t/p/w185//${poster_path}`;
        return (
            <Sima onClick={() => this.clickedMovie(id)}>
                <div>{original_title}</div>
                <img src={imagePath} />
            </Sima>
        );
    }
}

const Sima = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 10px;
    justify-content: center;
    align-items: center;
`;

export default Sim;
