import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../skjema/Checkbox';
import { parseJaEllerNei } from '../JaEllerNei';
import Feilomrade from '../../skjema/Feilomrade';
import Radioknapper from '../../skjema/Radioknapper';
import { getLedetekst } from 'digisyfo-npm';
import inntektskildetyper, { ANNET } from '../../../enums/inntektskildetyper';

export const getInntektskildeLabel = (annenInntektskildeType, ledetekster) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${annenInntektskildeType}.label`, ledetekster);
};

const getPresisering = (annenInntektskildeType, ledetekster) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${annenInntektskildeType}.presisering`, ledetekster);
};

export const VelgInntektskilder = ({ fields, meta, ledetekster }) => {
    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.sporsmal', ledetekster)}</h4>
        <p>{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.informasjon', ledetekster)}</p>
        {
            fields.map((field, index) => {
                return (
                    <Field
                        label={getInntektskildeLabel(field.annenInntektskildeType, ledetekster)}
                        id={`inntektskilde-${index}`}
                        name={`andreInntektskilder[${index}].avkrysset`}
                        key={index}
                        component={Checkbox}>
                        {
                            field.annenInntektskildeType === ANNET ? null : <Field
                                component={Radioknapper}
                                spoersmal={getLedetekst('sykepengesoknad.andre-inntektskilder.er-du-sykmeldt-fra-dette.sporsmal', ledetekster)}
                                parse={parseJaEllerNei}
                                name={`andreInntektskilder[${index}].sykmeldt`}>
                                    <input label={getLedetekst('sykepengesoknad.ja', ledetekster)} value>
                                        <div className="presisering blokk">
                                            <p className="sist">{getPresisering(field.annenInntektskildeType, ledetekster)}</p>
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
    return <FieldArray component={VelgInntektskilder} fields={inntektskildetyper} ledetekster={ledetekster} name="andreInntektskilder" />;
};

AndreInntektskilderComponent.propTypes = {
    ledetekster: PropTypes.object,
};

export default AndreInntektskilderComponent;
