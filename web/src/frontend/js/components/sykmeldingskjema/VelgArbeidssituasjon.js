import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import arbeidssituasjoner from '../../arbeidssituasjonData';
import { getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import Feilmelding from '../skjema/Feilmelding';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { ARBEIDSTAKER, DEFAULT } from '../../enums/arbeidssituasjoner';
import { sykmelding as sykmeldingPt, arbeidsgiver as arbeidsgiverPt } from '../../propTypes';

const getArbeidssituasjoner = (arbeidssituasjon) => {
    if (!arbeidssituasjon || arbeidssituasjon === DEFAULT) {
        return arbeidssituasjoner;
    }
    return arbeidssituasjoner.filter((a) => {
        return a.verdi !== DEFAULT;
    });
};

export const RendreVelgArbeidssituasjon = (props) => {
    const { input, meta, ledetekster } = props;
    return (
        <div>
            <div className="medHjelpetekst">
                <label htmlFor="select-arbeidssituasjon" className="skjema__sporsmal medHjelpetekst">
                    {getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster)}
                </label>
                <Hjelpetekst
                    id="velg-arbeidssituasjon-hjelpetekst"
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.tittel', ledetekster)}
                    tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.tekst', ledetekster)} />
            </div>
            <div className="selectContainer">
                <select {...input} className={meta.error && meta.touched ? 'input--feil' : ''}>
                    {getArbeidssituasjoner(input.value).map((arbeidssituasjon, index) => {
                        return <option value={arbeidssituasjon.verdi} key={index}>{arbeidssituasjon.tekst}</option>;
                    })}
                </select>
            </div>
            <Feilmelding {...meta} />
        </div>
    );
};

export const Velg = (props) => {
    const Sporsmal = <RendreVelgArbeidssituasjon {...props} />;
    return (<SporsmalMedTillegg className="hovedsporsmal" {...props} Sporsmal={Sporsmal} visTillegg={(_props) => {
        const { input } = _props;
        return input.value === ARBEIDSTAKER;
    }}>
        <VelgArbeidsgiver {...props} />
    </SporsmalMedTillegg>);
};

RendreVelgArbeidssituasjon.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
};

const VelgArbeidssituasjon = (props) => {
    const { ledetekster, untouch, arbeidsgivere, sykmelding, pilotSykepenger } = props;

    return (<Field
        ledetekster={ledetekster}
        arbeidsgivere={arbeidsgivere}
        pilotSykepenger={pilotSykepenger}
        sykmelding={sykmelding}
        component={Velg}
        name="valgtArbeidssituasjon"
        onBlur={() => {
            untouch('valgtArbeidsgiver');
        }} />);
};

VelgArbeidssituasjon.propTypes = {
    ledetekster: PropTypes.object,
    untouch: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    sykmelding: sykmeldingPt,
    pilotSykepenger: PropTypes.bool,
};

export default VelgArbeidssituasjon;
