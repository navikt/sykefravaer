import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Feilomrade from '../skjema/Feilomrade';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import { Radioknapp } from '../skjema/Radioknapper';

const VET_IKKE = 'VET_IKKE';
const JA = 'JA';
const NEI = 'NEI';

export const ForskuttererSporsmal = ({ input, meta, arbeidsgiver }) => {
    return (<div>
        <h3 className="skjema__sporsmal">{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.overskrift')}</h3>
        <p>{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.tekst')}</p>
        <p>
            {getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.sporsmal', {
                '%ARBEIDSGIVER%': arbeidsgiver.navn,
            })}
        </p>
        <Feilomrade {...meta} id="arbeidsgiverForskutterer">
            <Radioknapp key={0} label="Ja" id="arbeidsgiverForskutterer-JA" value={JA} input={input} />
            <Radioknapp key={1} label="Nei" id="arbeidsgiverForskutterer-NEI" value={NEI} input={input} />
            <Radioknapp key={2} label="Vet ikke" id="arbeidsgiverForskutterer-VET_IKKE" value={VET_IKKE} input={input} />
        </Feilomrade>
    </div>);
};

ForskuttererSporsmal.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    arbeidsgiver: PropTypes.object,
};

export const RendreForskuttererArbeidsgiver = (props) => {
    const Sporsmal = <ForskuttererSporsmal {...props} />;
    return (<SporsmalMedTillegg className="hovedsporsmal__tilleggssporsmal" {...props} Sporsmal={Sporsmal} visTillegg={(_props) => {
        const input = _props.input;
        return input && (input.value === VET_IKKE || input.value === NEI);
    }}>
        <div className="ekstrasporsmal ekstrasporsmal--sist" dangerouslySetInnerHTML={getHtmlLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.nei-vet-ikke')} />
    </SporsmalMedTillegg>);
};

const ForskuttererArbeidsgiver = ({ arbeidsgiver }) => {
    return (<Field
        component={RendreForskuttererArbeidsgiver}
        name="arbeidsgiverForskutterer"
        arbeidsgiver={arbeidsgiver} />);
};

ForskuttererArbeidsgiver.propTypes = {
    input: PropTypes.object,
    arbeidsgiver: PropTypes.object,
};

export default ForskuttererArbeidsgiver;
