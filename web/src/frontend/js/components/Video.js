import React, { Component } from 'react';
import PropTypes from 'prop-types';

let settStorrelse;

const getSidebredde = () => {
    const s = document.getElementsByClassName('js-begrensning')[0];
    const style = window.getComputedStyle(s);
    return parseInt(style.width, 10) - parseInt(style.paddingLeft, 10) - parseInt(style.paddingRight, 20);
};

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
        };
    }

    componentDidMount() {
        settStorrelse = () => {
            this.settStorrelse();
        };
        window.addEventListener('resize', settStorrelse);
        this.settStorrelse();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', settStorrelse);
    }

    settStorrelse() {
        const lite = document.getElementsByClassName('lite-film')[0] ? 60 : 0;
        const width = getSidebredde() - lite;
        const forhold = parseInt(this.props.width, 10) / width;
        const height = parseInt(this.props.height / forhold, 10);
        this.setState({
            width, height,
        });
    }

    render() {
        return <iframe title="Video" className="iframeVideo" src={`${this.props.src}&width=${this.state.width}&height=${this.state.height}`} width={this.state.width} height={this.state.height} scrolling="no" frameBorder="0" />;
    }
}

Video.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default Video;
