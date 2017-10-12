import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class LandingssideLenke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: `${props.ikon}.svg`,
            variant: `peker__ikon--${props.variant}`,
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: `${this.props.ikon}_hover.svg`,
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: `${this.props.ikon}.svg`,
        });
    }

    render() {
        return (<Link
            className="peker"
            to={this.props.to}
            onMouseEnter={() => {
                this.onMouseEnter();
            }}
            onMouseLeave={() => {
                this.onMouseLeave();
            }}>
            <div className={`peker__ikon ${this.state.variant}`}>
                <img src={`/sykefravaer/img/svg/${this.state.ikon}`} alt={this.props.ikonAlt} />
            </div>
            <div className="peker__innhold">
                <h2>{this.props.tittel}</h2>
                { this.props.undertittel ? <p className="peker__undertittel">{this.props.undertittel}</p> : null }
            </div>
        </Link>);
    }
}

LandingssideLenke.propTypes = {
    ikon: PropTypes.string.isRequired,
    ikonAlt: PropTypes.string.isRequired,
    variant: PropTypes.string,
    tittel: PropTypes.string.isRequired,
    undertittel: PropTypes.string,
    to: PropTypes.string.isRequired,
};
