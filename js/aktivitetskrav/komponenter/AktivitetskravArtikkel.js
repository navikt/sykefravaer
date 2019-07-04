import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    getLedetekst, getHtmlLedetekst, tilLesbarDatoMedArstall, Radiofaner, keyValue,
} from '@navikt/digisyfo-npm';

const MED_ARBEIDSGIVER = 'MED_ARBEIDSGIVER';
const UTEN_ARBEIDSGIVER = 'UTEN_ARBEIDSGIVER';

const alternativer = [{
    verdi: MED_ARBEIDSGIVER,
    tittel: 'Jeg har arbeidsgiver',
}, {
    verdi: UTEN_ARBEIDSGIVER,
    tittel: 'Jeg har ikke arbeidsgiver',
}];

class Artikkel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arbeidssituasjon: MED_ARBEIDSGIVER,
        };
    }

    setArbeidssituasjon(arbeidssituasjon) {
        this.setState({
            arbeidssituasjon,
        });
    }

    render() {
        const { arbeidssituasjon } = this.state;
        const { ledetekster, inntruffetdato } = this.props;
        return (
            <article className="panel blokk">
                <header className="artikkel__header">
                    <div className="artikkel__meta">
                        <Link to="/sykefravaer" className="tilbakelenke">Tilbake</Link>
                        <p className="artikkel__meta__dato">{tilLesbarDatoMedArstall(inntruffetdato)}</p>
                    </div>
                    <h1 className="artikkel__tittel">{getLedetekst('aktivitetskrav-varsel.tittel', ledetekster)}</h1>
                    <Radiofaner
                        changeHandler={(v) => {
                            this.setArbeidssituasjon(v);
                        }}
                        alternativer={alternativer}
                        valgtAlternativ={arbeidssituasjon} />
                </header>
                <p className="artikkel__ingress">{getLedetekst('aktivitetskrav-varsel.ingress', ledetekster)}</p>
                <div className="artikkel__bilde">
                    <img
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/aktivitetsvarsel_${arbeidssituasjon}.svg`}
                        alt={`aktivitetskrav-varsel.alt.${arbeidssituasjon}`} />
                </div>
                <div
                    className="artikkel__innhold"
                    dangerouslySetInnerHTML={getHtmlLedetekst(`aktivitetskrav-varsel.innhold.${arbeidssituasjon}`, ledetekster)} />
            </article>
        );
    }
}

Artikkel.propTypes = {
    ledetekster: keyValue,
    inntruffetdato: PropTypes.instanceOf(Date),
};

export default Artikkel;
