import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, senesteTom } from 'digisyfo-npm';
import { sykmelding as sykmeldingPt } from '../../propTypes';
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
            return `${base}arbeidsgiver.svg`;
        case 'Selvstendig næringsdrivende':
        case 'Frilanser':
            return `${base}id-kort.svg`;
        default:
            return `${base}skilt.svg`;
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
    render() {
        const { dineSykmeldinger } = this.props;
        if (!dineSykmeldinger) {
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
    dineSykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export function mapStateToProps(state) {
    return {
        dineSykmeldinger: state.dineSykmeldinger.data,
    };
}

const ArbeidssituasjonerContainer = connect(mapStateToProps)(Container);

export default ArbeidssituasjonerContainer;
