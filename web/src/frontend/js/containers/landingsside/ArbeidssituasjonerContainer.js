import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, senesteTom } from 'digisyfo-npm';
import * as actions from '../../actions/ledere_actions';
import { naermesteLeder as naermesteLederPt, sykmelding as sykmeldingPt } from '../../propTypes';
import Arbeidssituasjon from '../../components/landingsside/Arbeidssituasjon';
import NaermesteLederContainer from './NaermesteLederContainer';

function mapArbeidssituasjonString(arbeidssituasjon) {
    switch (arbeidssituasjon) {
        case 'ARBEIDSTAKER':
            return 'Arbeidstaker';
        case 'NAERINGSDRIVENDE':
            return 'Selvstendig næringsdrivende';
        case 'FRILANSER':
            return 'Frilanser';
        case 'ARBEIDSLEDIG':
            return 'Arbeidsledig';
        default:
            return 'Annet';
    }
}

function mapArbeidssituasjonTilIkonSrc(arbeidssituasjon) {
    const base = '/sykefravaer/img/svg/landingsside/';
    switch (arbeidssituasjon) {
        case 'Arbeidstaker':
            return `${base} arbeidsgiver.svg`;
        case 'Selvstendig næringsdrivende':
        case 'Frilanser':
            return `${base} id card 1.svg`;
        default:
            return `${base} direction sign.svg`;
    }
}

function gyldigeSykmeldinger(dineSykmeldinger) {
    const treMndSiden = new Date();
    treMndSiden.setMonth(treMndSiden.getMonth() - 3);

    return dineSykmeldinger.filter((sykmelding) => {
        return senesteTom(sykmelding.mulighetForArbeid.perioder) > treMndSiden;
    });
}

function filtrerArbeidssituasjoner(sykmeldinger) {
    return [...new Set(sykmeldinger.filter((sykmelding) => {
        return sykmelding.status === 'BEKREFTET';
    }).map((sykmelding) => {
        return mapArbeidssituasjonString(sykmelding.valgtArbeidssituasjon);
    }))];
}

function filtrerArbeidsgivere(sykmeldinger) {
    return [...new Set(sykmeldinger.filter((sykmelding) => {
        return sykmelding.status === 'SENDT';
    }).map((sykmelding) => {
        return sykmelding.innsendtArbeidsgivernavn;
    }))];
}

export class Container extends Component {
    componentWillMount() {
        const { hentLedere, forsoktHentet } = this.props;
        if (!forsoktHentet) {
            hentLedere();
        }
    }

    render() {
        const { henter, ledere, hentingFeilet, dineSykmeldinger } = this.props;
        if (henter || !ledere || ledere.length === 0 || hentingFeilet) {
            return null;
        }

        const sykmeldinger = gyldigeSykmeldinger(dineSykmeldinger);
        const arbeidssituasjoner = filtrerArbeidssituasjoner(sykmeldinger);
        const arbeidsgivere = filtrerArbeidsgivere(sykmeldinger);

        return (
            <div className="arbeidssituasjon-panel">
                {arbeidsgivere.map((arbeidsgiver, index) => {
                    return (
                        <Arbeidssituasjon
                            key={arbeidsgiver}
                            className={index > 0 ? 'situasjon__arbeidsgiver__border' : ''}
                            ikonSrc={mapArbeidssituasjonTilIkonSrc('Arbeidstaker')}
                            ikonAlt="Arbeidstaker"
                            situasjon={
                                <div className="situasjon__innhold">
                                    <p className="situasjon__tittel">
                                        {getLedetekst('din-situasjon.ansatt', {
                                            '%ORGANISASJONSNAVN%': arbeidsgiver,
                                        })}
                                    </p>
                                    <NaermesteLederContainer organisasjonsnavn={arbeidsgiver} />
                                </div>}
                        />);
                })}
                {arbeidssituasjoner.filter((arbeidssituasjon) => {
                    return !(arbeidssituasjon === 'Arbeidstaker' && (Array.isArray(arbeidsgivere) || arbeidsgivere.length));
                }).map((arbeidssituasjon) => {
                    return (
                        <Arbeidssituasjon
                            key={arbeidssituasjon}
                            className="situasjon__margin"
                            ikonSrc={mapArbeidssituasjonTilIkonSrc(arbeidssituasjon)}
                            ikonAlt={arbeidssituasjon}
                            situasjon={<p className="situasjon__tittel">{arbeidssituasjon}</p>} />
                    );
                })}
            </div>
        );
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledere: PropTypes.arrayOf(naermesteLederPt),
    hentLedere: PropTypes.func,
    forsoktHentet: PropTypes.bool,
    dineSykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export function mapStateToProps(state) {
    return {
        ledere: state.ledere.data,
        henter: state.ledere.henter,
        hentingFeilet: state.ledere.hentingFeilet,
        forsoktHentet: state.ledere.hentet === true,
        dineSykmeldinger: state.dineSykmeldinger.data,
    };
}

const ArbeidssituasjonerContainer = connect(mapStateToProps, actions)(Container);

export default ArbeidssituasjonerContainer;
