import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../skjema/Checkbox';
import { parseJaEllerNei } from '../JaEllerNei';
import Feilomrade from '../../skjema/Feilomrade';
import Radioknapper from '../../skjema/Radioknapper';
import { getLedetekst } from 'digisyfo-npm';

const ANDRE_ARBEIDSFORHOLD = 'ANDRE_ARBEIDSFORHOLD';
const SELVSTENDIG_NAERINGSDRIVENDE = 'SELVSTENDIG_NAERINGSDRIVENDE';
const SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA = 'SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA';
const JORDBRUKER_FISKER_REINDRIFTSUTOEVER = 'JORDBRUKER_FISKER_REINDRIFTSUTOEVER';
const FRILANSER = 'FRILANSER';
export const ANNET = 'ANNET';

export const fields = [
    ANDRE_ARBEIDSFORHOLD,
    SELVSTENDIG_NAERINGSDRIVENDE,
    SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA,
    JORDBRUKER_FISKER_REINDRIFTSUTOEVER,
    FRILANSER,
    ANNET,
];

export const getInntektskildeLabel = (field, ledetekster) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${field}.label`, ledetekster);
};

const getPresisering = (field, ledetekster) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${field}.presisering`, ledetekster);
};

export const VelgInntektskilder = ({ fields, meta, ledetekster }) => {
    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.sporsmal', ledetekster)}</h4>
        <p>{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.informasjon', ledetekster)}</p>
        {
            fields.map((field, index) => {
                return (<Field label={getInntektskildeLabel(field, ledetekster)} id={`inntektskilde-${index}`} name={`andreInntektskilder.${field}.avkrysset`} key={index} component={Checkbox}>
                    {
                        field === ANNET ? null : <Field
                            component={Radioknapper}
                            spoersmal={getLedetekst('sykepengesoknad.andre-inntektskilder.er-du-sykmeldt-fra-dette.sporsmal', ledetekster)}
                            parse={parseJaEllerNei}
                            name={`andreInntektskilder.${field}.sykmeldt`}>
                                <input label={getLedetekst('sykepengesoknad.ja', ledetekster)} value>
                                    <div className="presisering blokk">
                                        <p className="sist">{getPresisering(field, ledetekster)}</p>
                                    </div>
                                </input>
                                <input label={getLedetekst('sykepengesoknad.nei', ledetekster)} value={false} />
                            </Field>
                    }
                </Field>);
            })
        }
    </Feilomrade>);
};

VelgInntektskilder.propTypes = {
    fields: PropTypes.array,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
};

const AndreInntektskilderComponent = ({ ledetekster }) => {
    return <FieldArray component={VelgInntektskilder} fields={fields} ledetekster={ledetekster} name="andreInntektskilder" />;
};

AndreInntektskilderComponent.propTypes = {
    ledetekster: PropTypes.object,
};

export default AndreInntektskilderComponent;
