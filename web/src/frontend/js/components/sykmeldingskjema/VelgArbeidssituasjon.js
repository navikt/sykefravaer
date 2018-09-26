import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst, arbeidssituasjoner as arbeidssituasjonerEnums } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { sykmelding as sykmeldingPt, arbeidsgiver as arbeidsgiverPt, fieldPropTypes } from '../../propTypes';
import Radioknapper from '../skjema/Radioknapper';
import { formaterOrgnr } from '../../utils';
import ErLederRiktig from './ErLederRiktig';
import { SkrivUt } from './VelgArbeidsgiver';
import { ANNEN_ARBEIDSGIVER_ORGNUMMER, ANNEN_ARBEIDSSITUASJON } from '../../enums/sykmeldingskjemaenums';

const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER, ARBEIDSLEDIG, ANNET } = arbeidssituasjonerEnums;

const arbeidssituasjoner = [NAERINGSDRIVENDE, FRILANSER, ARBEIDSTAKER, ARBEIDSLEDIG, ANNET];

const harValgtArbeidsgiver = (svar, arbeidsgivere) => {
    return arbeidsgivere.find((s) => {
        return s.orgnummer === svar;
    }) !== undefined;
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

export const Velg = (props) => {
    const { input, sykmelding, arbeidsgivere } = props;
    const valgtArbeidsgiver = arbeidsgivere.find((s) => {
        return s.orgnummer === input.value;
    });
    const naermesteLeder = valgtArbeidsgiver ? valgtArbeidsgiver.naermesteLeder : {};
    const tillegg = input.value === ARBEIDSTAKER
        ? <SkrivUt sykmelding={sykmelding} />
        : <ErLederRiktig naermesteLeder={naermesteLeder} />;
    const Sporsmal = <RendreVelgArbeidssituasjon {...props} />;
    return (<SporsmalMedTillegg
        className="hovedsporsmal blokk--s"
        {...props}
        Sporsmal={Sporsmal}
        visTillegg={(_props) => {
            return !_props.harStrengtFortroligAdresse
                && (harValgtArbeidsgiver(_props.input.value, arbeidsgivere)
                    || _props.input.value === ARBEIDSTAKER);
        }}>
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
            visArbeidssituasjoner: false,
        };
    }

    onChange(event, value) {
        const { arbeidsgivere, autofill } = this.props;
        if (harValgtArbeidsgiver(value, arbeidsgivere)) {
            const arbeidsgiver = arbeidsgivere.find((ag) => {
                return ag.orgnummer === value;
            });
            autofill('valgtArbeidsgiver', arbeidsgiver);
            autofill('valgtArbeidssituasjon', null);
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
};

export default VelgArbeidssituasjon;
