import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst, arbeidssituasjoner as arbeidssituasjonerEnums } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import VelgArbeidsgiverContainer from '../../containers/sykmelding/VelgArbeidsgiverContainer';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { sykmelding as sykmeldingPt, arbeidsgiver as arbeidsgiverPt, fieldPropTypes } from '../../propTypes';
import Radioknapper from '../skjema/Radioknapper';

const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER, ARBEIDSLEDIG, ANNET } = arbeidssituasjonerEnums;

const arbeidssituasjoner = [{
    verdi: ARBEIDSTAKER,
}, {
    verdi: NAERINGSDRIVENDE,
}, {
    verdi: FRILANSER,
}, {
    verdi: ARBEIDSLEDIG,
}, {
    verdi: ANNET,
}];

export const RendreVelgArbeidssituasjon = (props) => {
    const { input, meta } = props;
    return (<Radioknapper
        id="valgtArbeidssituasjon"
        input={input}
        meta={meta}
        spoersmal={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}
        hjelpetekst={<Hjelpetekst id="velg-arbeidssituasjon-hjelpetekst">{getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.2.tekst')}</Hjelpetekst>}>
        {
            arbeidssituasjoner.map((arbeidssituasjon) => {
                return (<i
                    value={arbeidssituasjon.verdi}
                    key={arbeidssituasjon.verdi}
                    label={getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${arbeidssituasjon.verdi.toLowerCase()}`)} />);
            })
        }
    </Radioknapper>);
};

export const Velg = (props) => {
    const Sporsmal = <RendreVelgArbeidssituasjon {...props} />;
    return (<SporsmalMedTillegg
        className="hovedsporsmal blokk--s"
        {...props}
        Sporsmal={Sporsmal}
        visTillegg={(_props) => {
            const { input } = _props;
            return input.value === ARBEIDSTAKER;
        }}>
        <VelgArbeidsgiverContainer {...props} />
    </SporsmalMedTillegg>);
};

RendreVelgArbeidssituasjon.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
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
