import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Sim from "../components/Sim";
import styled from "styled-components";

class Same extends Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
        this.getList = this.getList.bind(this);
        this.movieFlow = this.movieFlow.bind(this);
    }
    getList = async id => {
        let res = await axios.get(
            `${this.props.link}${id}/similar${this.props.stash}`
        );
        this.setState({ list: res.data.results.slice(0, 5) });
    };

    movieFlow = id => {
        this.props.changeMovie(id);
    };

    componentDidMount() {
        this.getList(this.props.movieId);
        this.setState({ movieId: this.props.movieId });
    }

    componentDidUpdate() {
        if (this.state.movieId !== this.props.movieId) {
            this.getList(this.props.movieId);
            this.setState({ movieId: this.props.movieId });
        }
    }
    render() {
        let { list } = this.state;
        let similars = list.map(samesis => (
            <Sim
                key={samesis.id}
                {...samesis}
                movieFlow={this.movieFlow.bind(this)}
            >
                hi
            </Sim>
        ));
        return <Sime>{similars}</Sime>;
    }
}

const Sime = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 768px) {
        flex-wrap: nowrap;
    }
`;

function mapStateToProps(reduxState) {
    return {
        movieId: reduxState.movies.movieId,
        link: reduxState.movies.link,
        stash: reduxState.movies.stash
    };
}

export default connect(mapStateToProps)(Same);
