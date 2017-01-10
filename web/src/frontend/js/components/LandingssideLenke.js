import React, { PropTypes, Component } from 'react';
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
            variant: `peker__ikon--${this.props.variant}-uthevet`,
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: `${this.props.ikon}.svg`,
            variant: `peker__ikon--${this.props.variant}`,
        });
    }

    render() {
        return (<Link className={`peker js-${this.props.type}`} to={this.props.to}
            onMouseEnter={() => {this.onMouseEnter();}}
            onMouseLeave={() => {this.onMouseLeave();}}>
            <div className={`peker__ikon ${this.state.variant}`}>
                <img src={`/sykefravaer/img/svg/${this.state.ikon}`} alt={this.props.ikonAlt} />
            </div>
            <div className="peker__innhold">
                <h2 className="typo-undertittel">{this.props.tittel}</h2>
                <p className="typo-undertekst">{this.props.undertittel}</p>
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
    type: PropTypes.string.isRequired,
};
