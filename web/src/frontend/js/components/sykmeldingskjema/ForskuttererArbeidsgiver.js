import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Feilomrade from '../skjema/Feilomrade';

const Radioknapp = ({ id, label, input, value, children }) => {
    return (<div className="skjema__input">
        <input type="radio" className="radioknapp" id={id} {...input} value={value} />
        <label htmlFor={id}>{label}</label>
        {
            input.value === value && children ? children : null
        }
    </div>);
};

const Radioknapper = ({ input, meta, ledetekster }) => {
    return (<Feilomrade {...meta}>
        <Radioknapp key={0} label="Ja" id="arbeidsgiverForskutterer-JA" value="JA" input={input} />
        <Radioknapp key={1} label="Nei" id="arbeidsgiverForskutterer-NEI" value="NEI" input={input}>
            <div className="panel panel-ekstra" dangerouslySetInnerHTML={getHtmlLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.nei-vet-ikke', ledetekster)} />
        </Radioknapp>
        <Radioknapp key={2} label="Vet ikke" id="arbeidsgiverForskutterer-VET_IKKE" value="VET_IKKE" input={input}>
            <div className="panel panel-ekstra" dangerouslySetInnerHTML={getHtmlLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.nei-vet-ikke', ledetekster)} />
        </Radioknapp>
    </Feilomrade>);
};

const ForskuttererArbeidsgiver = ({ arbeidsgiver, ledetekster }) => {
    return (<div className="blokk">
        <h3 className="skjema__sporsmal">{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.overskrift', ledetekster)}</h3>
        <p>{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.tekst', ledetekster)}</p>
        <p>
            {getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.sporsmal', ledetekster, {
                '%ARBEIDSGIVER%': arbeidsgiver.navn,
            })}
        </p>
        <Field component={Radioknapper} name="arbeidsgiverForskutterer" ledetekster={ledetekster} />
    </div>);
};

Radioknapp.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object,
    value: PropTypes.string,
    children: PropTypes.object,
};

Radioknapper.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
};

ForskuttererArbeidsgiver.propTypes = {
    arbeidsgiver: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ForskuttererArbeidsgiver;
