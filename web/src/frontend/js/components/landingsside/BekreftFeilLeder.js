import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Varselstripe, getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';
import { Vis } from '../../utils';

export class LederAvkreftet extends Component {
    componentDidMount() {
        this.lukk.focus();
    }

    render() {
        const { onLukk } = this.props;
        return (<div>
            <p className="hode hode--suksess">Lederen er avkreftet!</p>
            <div className="knapperad">
                <button
                    ref={(c) => {
                        this.lukk = c;
                    }}
                    className="rammeknapp js-lukk"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onLukk();
                    }}>Lukk</button>
            </div>
        </div>);
    }
}

LederAvkreftet.propTypes = {
    onLukk: PropTypes.func,
};

const BekreftFeilLeder = ({ leder, onAvbryt, avkreftLeder, avkrefter, avkreftFeilet }) => {
    const knappClassName = 'knapp knapp--fare blokk--s js-bekreft';
    return (<div>
        <div className={avkreftFeilet ? 'blokk' : ''}>
            <h3 className="panel__tittel">{getLedetekst('sykefravaer.endre-naermeste-leder.tittel')}</h3>
            <div dangerouslySetInnerHTML={getHtmlLedetekst('sykefravaer.endre-naermeste-leder.melding', {
                '%LEDER%': leder.navn,
                '%ARBEIDSGIVER%': leder.organisasjonsnavn,
            })} />
        </div>
        <div aria-live="polite" role="alert" className={avkreftFeilet ? 'panel panel--ramme panel--komprimert' : ''}>
            <Vis hvis={avkreftFeilet}>
                <Varselstripe type="feil">
                    <p className="sist">Beklager, det oppstod en feil!</p>
                </Varselstripe>
            </Vis>
        </div>
        <div className="knapperad">
            <button
                type="button"
                disabled={avkrefter}
                className={knappClassName}
                onClick={() => {
                    avkreftLeder(leder.orgnummer);
                }}>Ja, jeg er sikker
                <Vis hvis={avkrefter}>
                    <span className="knapp__spinner" />
                </Vis>
            </button>
            <p><a
                className="lenke js-avbryt"
                href="#"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    onAvbryt();
                }}>Avbryt</a></p>
        </div>
    </div>);
};

BekreftFeilLeder.propTypes = {
    leder: naermesteLederPt,
    onAvbryt: PropTypes.func,
    avkreftLeder: PropTypes.func,
    avkrefter: PropTypes.bool,
    avkreftFeilet: PropTypes.bool,
};

export default BekreftFeilLeder;
