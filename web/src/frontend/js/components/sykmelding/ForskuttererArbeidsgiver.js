import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
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

const Radioknapper = ({ input, meta, alternativer, ledetekster }) => {
    return (<Feilomrade {...meta}>
        {
            alternativer.map((alternativ, index) => {
                return (<Radioknapp key={index} label={alternativ.label} id={`arbeidsgiverForskutterer-${alternativ.verdi}`} value={alternativ.verdi} input={input}>
                    {
                        alternativ.verdi === 'VET_IKKE' ? <div className="panel panel-ekstra">
                            <p className="sist">{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.vet-ikke', ledetekster)}</p>
                        </div> : null
                    }
                </Radioknapp>);
            })
        }
    </Feilomrade>);
};

const ForskuttererArbeidsgiver = ({ arbeidsgiver, ledetekster }) => {
    const alternativer = [{
        label: 'Ja',
        verdi: 'JA',
    }, {
        label: 'Nei',
        verdi: 'NEI',
    }, {
        label: 'Vet ikke',
        verdi: 'VET_IKKE',
    }];

    return (<div className="blokk">
        <h3 className="skjema__sporsmal">{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.overskrift', ledetekster)}</h3>
        <p>{getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.tekst', ledetekster)}</p>
        <p>
            {getLedetekst('starte-sykmelding.arbeidsgiver-forskutterer.sporsmal', ledetekster, {
                '%ARBEIDSGIVER%': arbeidsgiver.navn,
            })}
        </p>
        <Field component={Radioknapper} alternativer={alternativer} name="arbeidsgiverForskutterer" ledetekster={ledetekster} />
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
    alternativer: PropTypes.array,
    ledetekster: PropTypes.object,
};

ForskuttererArbeidsgiver.propTypes = {
    arbeidsgiver: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default ForskuttererArbeidsgiver;
