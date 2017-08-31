import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import Feilmelding from '../skjema/Feilmelding';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import arbeidssituasjoner, { ARBEIDSTAKER, DEFAULT } from '../../enums/arbeidssituasjoner';
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
    const { input, meta } = props;
    return (
        <div>
            <div className="medHjelpetekst">
                <label htmlFor="valgtArbeidssituasjon" className="skjema__sporsmal medHjelpetekst">
                    {getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}
                </label>
                <Hjelpetekst
                    id="velg-arbeidssituasjon-hjelpetekst"
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.2.tittel')}
                    tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.2.tekst')} />
            </div>
            <div className="selectContainer">
                <select id="valgtArbeidssituasjon" {...input} className={meta.error && meta.touched ? 'input--feil' : ''}>
                    {getArbeidssituasjoner(input.value).map((arbeidssituasjon, index) => {
                        return (<option value={arbeidssituasjon.verdi} key={index}>
                            {getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${arbeidssituasjon.verdi.toLowerCase()}`)}
                        </option>);
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
};

const VelgArbeidssituasjon = (props) => {
    const { untouch, arbeidsgivere, sykmelding } = props;

    return (<Field
        arbeidsgivere={arbeidsgivere}
        sykmelding={sykmelding}
        component={Velg}
        name="valgtArbeidssituasjon"
        onBlur={() => {
            untouch('valgtArbeidsgiver');
        }} />);
};

VelgArbeidssituasjon.propTypes = {
    untouch: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    sykmelding: sykmeldingPt,
};

export default VelgArbeidssituasjon;
