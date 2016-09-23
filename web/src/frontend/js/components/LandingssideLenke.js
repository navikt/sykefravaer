import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class LandingssideLenke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: 'doctor-2.svg',
            ikonHoykontrast: 'doctor-2-highcontrast.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'doctor-2_hover.svg',
            ikonHoykontrast: 'doctor-2_hover-highcontrast.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'doctor-2.svg',
            ikonHoykontrast: 'doctor-2-highcontrast.svg',
        });
    }

    render() {
        return (<Link className="peker" to={this.props.to}
            onMouseEnter={() => {this.onMouseEnter();}}
            onMouseLeave={() => {this.onMouseLeave();}}>
            <img src={`/sykefravaer/img/svg/${this.state.ikon}`} alt={this.props.ikonAlt} className="peker__ikon" />
            <img src={`/sykefravaer/img/svg/${this.state.ikonHoykontrast}`} alt={this.props.ikonAlt} className="peker__ikon peker__ikon--hoykontrast" />
            <span>{this.props.children}</span>
        </Link>);
    }
}

LandingssideLenke.propTypes = {
    ikonAlt: PropTypes.string,
    children: PropTypes.string,
    to: PropTypes.string,
};
