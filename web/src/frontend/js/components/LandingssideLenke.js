import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class LandingssideLenke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: 'doctor-2.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'doctor-2_hover.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'doctor-2.svg',
        });
    }

    render() {
        return (<Link className="peker" to={this.props.to}
            onMouseEnter={() => {this.onMouseEnter();}}
            onMouseLeave={() => {this.onMouseLeave();}}>
            <img src={`/sykefravaer/img/svg/${this.state.ikon}`} alt={this.props.ikonAlt} className="peker__ikon" />
            <span>{this.props.children}</span>
        </Link>);
    }
}

LandingssideLenke.propTypes = {
    ikonAlt: PropTypes.string,
    children: PropTypes.string,
    to: PropTypes.string,
};
