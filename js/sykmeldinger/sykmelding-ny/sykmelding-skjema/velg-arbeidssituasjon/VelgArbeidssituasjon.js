import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst, arbeidssituasjoner as arbeidssituasjonerEnums } from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import SporsmalMedTillegg from '../../../../components/skjema/SporsmalMedTillegg';
import { sykmelding as sykmeldingPt, arbeidsgiver as arbeidsgiverPt, fieldPropTypes } from '../../../../propTypes';
import Radioknapper from '../../../../components/skjema/Radioknapper';
import { formaterOrgnr } from '../../../../utils/index';
import ErLederRiktig from '../er-leder-riktig/ErLederRiktig';
import SkrivUtSykmeldingDialog from '../skriv-ut/SkrivUtSykmeldingDialog';
import { ANNEN_ARBEIDSGIVER_ORGNUMMER, ANNEN_ARBEIDSSITUASJON } from '../../../enums/sykmeldingskjemaenums';

const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER, ARBEIDSLEDIG, ANNET } = arbeidssituasjonerEnums;

const arbeidssituasjoner = [NAERINGSDRIVENDE, FRILANSER, ARBEIDSTAKER, ARBEIDSLEDIG, ANNET];

const harValgtArbeidsgiver = (svar, arbeidsgivere) => {
    return arbeidsgivere.find((s) => {
        return s.orgnummer === svar;
    }) !== undefined;
};

export const harValgtArbeidsgiverMedNaermesteLeder = (svar, arbeidsgivere) => {
    const valgtArbeidsgiver = arbeidsgivere.find((s) => {
        return s.orgnummer === svar;
    });
    return harValgtArbeidsgiver(svar, arbeidsgivere) && valgtArbeidsgiver.naermesteLeder !== null;
};

export const RendreVelgArbeidssituasjon = ({ input, meta, arbeidsgivere, alternativer }) => {
    const hjelpelinje = arbeidsgivere.length > 1
        ? <p>{getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.flere-arbeidsgivere-infotekst')}</p>
        : null;
    const gdpr = harValgtArbeidsgiver(input.value, arbeidsgivere)
        ? <p className="sist js-gdpr">{getLedetekst('send-til-arbeidsgiver.gdpr.sender-til-altinn')}</p>
        : null;

    return (<div>
        <Radioknapper
            hjelpelinje={hjelpelinje}
            id="valgtArbeidssituasjon"
            input={input}
            meta={meta}
            spoersmal={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.3')}
            hjelpetekst={<Hjelpetekst id="velg-arbeidssituasjon-hjelpetekst">{getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.2.tekst')}</Hjelpetekst>}>
            {
                alternativer
                    .map((alternativ, index) => {
                        return (<i
                            key={index}
                            label={alternativ.label}
                            value={alternativ.value}
                            labelSekundaer={alternativ.labelSekundaer} />);
                    })
            }
        </Radioknapper>
        {gdpr}
    </div>);
};

RendreVelgArbeidssituasjon.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    alternativer: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    })),
};

export const visTillegg = (props) => {
    const value = props.input.value;
    const arbeidsgivere = props.arbeidsgivere;
    return !props.harStrengtFortroligAdresse
        && (harValgtArbeidsgiverMedNaermesteLeder(value, arbeidsgivere)
            || value === ARBEIDSTAKER);
};

export const Velg = (props) => {
    const { input, sykmelding, arbeidsgivere } = props;
    const valgtArbeidsgiver = arbeidsgivere.find((s) => {
        return s.orgnummer === input.value;
    });
    const tillegg = input.value === ARBEIDSTAKER
        ? <SkrivUtSykmeldingDialog sykmelding={sykmelding} />
        : harValgtArbeidsgiverMedNaermesteLeder(input.value, arbeidsgivere)
            ? <ErLederRiktig naermesteLeder={valgtArbeidsgiver.naermesteLeder} />
            : null;
    const Sporsmal = <RendreVelgArbeidssituasjon {...props} />;
    return (<SporsmalMedTillegg
        className="hovedsporsmal blokk--s"
        {...props}
        Sporsmal={Sporsmal}
        visTillegg={visTillegg}>
        {tillegg}
    </SporsmalMedTillegg>);
};

Velg.propTypes = {
    input: fieldPropTypes.input,
    sykmelding: sykmeldingPt,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
};

RendreVelgArbeidssituasjon.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
};

export const getArbeidsgivere = (arbeidsgivere) => {
    return arbeidsgivere.map((a) => {
        return {
            label: a.navn,
            value: a.orgnummer,
            labelSekundaer: `(${getLedetekst('send-til-arbeidsgiver.orgnr')}: ${formaterOrgnr(a.orgnummer)})`,
        };
    });
};

export const getArbeidsgivereOgArbeidssituasjoner = (arbeidsgivere) => {
    return [
        ...getArbeidsgivere(arbeidsgivere),
        ...arbeidssituasjoner.map((value) => {
            const label = arbeidsgivere.length > 0
                && value === ARBEIDSTAKER
                ? getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${value.toLowerCase()}-annen-arbeidsgiver.2`)
                : getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${value.toLowerCase()}.2`);

            return {
                value,
                label,
            };
        }),
    ];
};

export const getAlternativer = (arbeidsgivere, state = {}) => {
    const flereValg = {
        label: getLedetekst('din-sykmelding.arbeidssituasjon.vis-flere-valg'),
        value: ANNEN_ARBEIDSSITUASJON,
    };
    return !state.visArbeidssituasjoner && arbeidsgivere.length > 0
        ? [
            ...getArbeidsgivere(arbeidsgivere),
            flereValg,
        ]
        : getArbeidsgivereOgArbeidssituasjoner(arbeidsgivere);
};

class VelgArbeidssituasjon extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            visArbeidssituasjoner: props.initialValues.valgtArbeidssituasjonShadow !== null,
        };
    }

    onChange(event, value) {
        const { arbeidsgivere, autofill } = this.props;

        if (harValgtArbeidsgiver(value, arbeidsgivere)) {
            const valgtArbeidsgiver = arbeidsgivere.find((ag) => {
                return ag.orgnummer === value;
            });
            autofill('valgtArbeidsgiver', valgtArbeidsgiver);
            autofill('valgtArbeidssituasjon', ARBEIDSTAKER);
        } else if (value === ANNEN_ARBEIDSSITUASJON) {
            this.setState({
                visArbeidssituasjoner: true,
            });
            autofill('valgtArbeidsgiver', null);
            autofill('valgtArbeidssituasjon', null);
        } else if (value === ARBEIDSTAKER) {
            autofill('valgtArbeidssituasjon', ARBEIDSTAKER);
            autofill('valgtArbeidsgiver', {
                orgnummer: ANNEN_ARBEIDSGIVER_ORGNUMMER,
            });
        } else {
            autofill('valgtArbeidssituasjon', value);
        }
    }

    getAlternativer() {
        return getAlternativer(this.props.arbeidsgivere, this.state);
    }

    render() {
        const { untouch, arbeidsgivere, sykmelding, harStrengtFortroligAdresse } = this.props;

        return (<Field
            onChange={this.onChange}
            onBlur={() => {
                untouch('valgtArbeidsgiver');
            }}
            alternativer={this.getAlternativer()}
            arbeidsgivere={arbeidsgivere}
            sykmelding={sykmelding}
            harStrengtFortroligAdresse={harStrengtFortroligAdresse}
            component={Velg}
            name="valgtArbeidssituasjonShadow" />);
    }
}

VelgArbeidssituasjon.propTypes = {
    untouch: PropTypes.func,
    autofill: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    sykmelding: sykmeldingPt,
    harStrengtFortroligAdresse: PropTypes.bool,
    initialValues: PropTypes.shape({
        valgtArbeidssituasjonShadow: PropTypes.string,
    }),
};

export default VelgArbeidssituasjon;
