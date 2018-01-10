import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { hentLedere } from '../../actions/ledere_actions';

export class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: 'utbetalinger.svg',
        };
    }

    componentDidMount() {
        if (this.props.skalHenteLedere) {
            this.props.hentLedere();
        }
    }

    onMouseEnter() {
        this.setState({
            ikon: 'utbetalinger--hover.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'utbetalinger.svg',
        });
    }

    render() {
        const URL = 'https://tjenester.nav.no/utbetalingsoversikt/';
        if (!this.props.vis) {
            return null;
        }

        return (<a
            onMouseEnter={() => {
                this.onMouseEnter();
            }}
            onMouseLeave={() => {
                this.onMouseLeave();
            }}
            href={URL}
            target="_blank"
            className="inngangspanel inngangspanel--ekstern blokk--l">
            <span className="inngangspanel__ikon">
                <img alt="" className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
            </span>
            <div className="inngangspanel__innhold">
                <h2 className="inngangspanel__tittel">{getLedetekst('dine-utbetalinger.tittel')}</h2>
                <p className="sist">{getLedetekst('dine-utbetalinger.beskrivelse')}</p>
            </div>
        </a>);
    }
}

Container.propTypes = {
    skalHenteLedere: PropTypes.bool,
    hentLedere: PropTypes.func,
    vis: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    return {
        skalHenteLedere: !state.ledere.hentet,
        vis: state.ledere.data.length > 0 && state.ledere.data.reduce((bool, leder) => {
            return bool || leder.arbeidsgiverForskuttererLoenn === false;
        }, false),
    };
};

export default connect(mapStateToProps, { hentLedere })(Container);
