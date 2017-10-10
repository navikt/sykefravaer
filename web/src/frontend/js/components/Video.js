import React, { Component } from 'react';
import PropTypes from 'prop-types';

let settStorrelse;

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
        const width = this.getSidebredde();
        const forhold = parseInt(this.props.width, 10) / width;
        const height = parseInt(this.props.height / forhold, 10);
        this.setState({
            width, height,
        });
    }

    getSidebredde() {
        const s = document.getElementsByClassName('js-begrensning')[0];
        const style = window.getComputedStyle(s);
        return parseInt(style.width, 10) - parseInt(style.paddingLeft, 10) - parseInt(style.paddingRight, 10);
    }

    render() {
        return <iframe className="iframeVideo" src={`${this.props.src}&width=${this.state.width}&height=${this.state.height}`} width={this.state.width} height={this.state.height} scrolling="no" frameBorder="0" />;
    }
}

Video.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default Video;
