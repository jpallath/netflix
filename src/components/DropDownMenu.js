import React, { Component } from "react";
import styled from "styled-components";

const DropDownContent = styled.div`
    opacity: 1;
    position: relative;
    right: 42px;
`;

const DropDownContentHidden = styled.div`
    opacity: 0;
`;

const DropDownSpan = styled.span`
    color: #00d1b2;
`;

const DropDownItem = styled.a`
    font-size: 10px;
`;

class DropDownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.triggerMenu = this.triggerMenu.bind(this);
        this.clickedMovie = this.clickedMovie.bind(this);
    }

    triggerMenu = () => {
        this.props.triggerMenu();
    };

    clickedMovie = id => {
        this.props.changeMovie(id);
    };
    render() {
        let popMovieList = this.props.popMovies.map(mov => (
            <DropDownItem
                key={mov.id}
                className="dropdown-item"
                onClick={() => this.clickedMovie(mov.id)}
            >
                {mov.original_title}
            </DropDownItem>
        ));
        return (
            <div className="dropdown is-active">
                <div className="dropdown-trigger" onClick={this.triggerMenu}>
                    <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                    >
                        <DropDownSpan>Popular Movies</DropDownSpan>
                        <span className="icon is-small">
                            <i
                                className="fa fa-angle-down"
                                aria-hidden="true"
                            />
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    {this.props.showMenu === "shown" ? (
                        <DropDownContent className="dropdown-content">
                            {popMovieList}
                        </DropDownContent>
                    ) : (
                        <DropDownContentHidden className="dropdown-content">
                            {popMovieList}
                        </DropDownContentHidden>
                    )}
                </div>
            </div>
        );
    }
}

export default DropDownMenu;
