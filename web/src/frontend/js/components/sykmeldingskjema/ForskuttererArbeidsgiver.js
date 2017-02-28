import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
import Feilomrade from '../skjema/Feilomrade';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { Radioknapp } from '../skjema/Radioknapper';

const VET_IKKE = 'VET_IKKE';
const JA = 'JA';
const NEI = 'NEI';

export const ForskuttererSporsmal = ({ input, meta, ledetekster, arbeidsgiver }) => {
    return (<div>
        <h3 className="skjema__sporsmal">{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.overskrift', ledetekster)}</h3>
        <p>{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.tekst', ledetekster)}</p>
        <p>
            {getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.sporsmal', ledetekster, {
                '%ARBEIDSGIVER%': arbeidsgiver.navn,
            })}
        </p>
        <Feilomrade {...meta}>
            <Radioknapp key={0} label="Ja" id="arbeidsgiverForskutterer-JA" value={JA} input={input} />
            <Radioknapp key={1} label="Nei" id="arbeidsgiverForskutterer-NEI" value={NEI} input={input} />
            <Radioknapp key={2} label="Vet ikke" id="arbeidsgiverForskutterer-VET_IKKE" value={VET_IKKE} input={input} />
        </Feilomrade>
    </div>);
};

ForskuttererSporsmal.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
    arbeidsgiver: PropTypes.object,
};

export const RendreForskuttererArbeidsgiver = (props) => {
    const { ledetekster } = props;
    const Sporsmal = <ForskuttererSporsmal {...props} />;
    return (<SporsmalMedTillegg className="hovedsporsmal__tilleggssporsmal" {...props} Sporsmal={Sporsmal} visTillegg={(_props) => {
        const input = _props.input;
        return input && input.value === VET_IKKE;
    }}>
        <div className="ekstrasporsmal ekstrasporsmal--sist">
            <p className="sist">{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.vet-ikke', ledetekster)}</p>
        </div>
    </SporsmalMedTillegg>);
};

RendreForskuttererArbeidsgiver.propTypes = {
    ledetekster: PropTypes.object,
};

const ForskuttererArbeidsgiver = ({ arbeidsgiver, ledetekster }) => {
    return (<Field
        component={RendreForskuttererArbeidsgiver}
        name="arbeidsgiverForskutterer"
        ledetekster={ledetekster}
        arbeidsgiver={arbeidsgiver} />);
};

ForskuttererArbeidsgiver.propTypes = {
    input: PropTypes.object,
    arbeidsgiver: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ForskuttererArbeidsgiver;
