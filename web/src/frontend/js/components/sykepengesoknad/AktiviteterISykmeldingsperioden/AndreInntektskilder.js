import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../skjema/Checkbox';
import { parseJaEllerNei } from '../JaEllerNei';
import Feilomrade from '../../skjema/Feilomrade';
import Radioknapper from '../../skjema/Radioknapper';
import { getLedetekst } from 'digisyfo-npm';
import inntektskildetyper, { ANNET } from '../../../enums/inntektskildetyper';

export const getInntektskildeLabel = (annenInntektskildeType) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${annenInntektskildeType}.label`);
};

const getPresisering = (annenInntektskildeType) => {
    return getLedetekst(`sykepengesoknad.andre-inntektskilder.${annenInntektskildeType}.presisering`);
};

export const VelgInntektskilder = ({ fields, meta }) => {
    return (<Feilomrade {...meta} id="andreInntektskilder">
        <h4 className="skjema__sporsmal">{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.sporsmal')}</h4>
        <p>{getLedetekst('sykepengesoknad.andre-inntektskilder.hvilke-inntektskilder.informasjon')}</p>
        {
            fields.map((field, index) => {
                return (
                    <Field
                        label={getInntektskildeLabel(field.annenInntektskildeType)}
                        id={`inntektskilde-${index}`}
                        name={`andreInntektskilder[${index}].avkrysset`}
                        key={index}
                        component={Checkbox}>
                        {
                            field.annenInntektskildeType === ANNET ? null : <Field
                                component={Radioknapper}
                                spoersmal={getLedetekst('sykepengesoknad.andre-inntektskilder.er-du-sykmeldt-fra-dette.sporsmal')}
                                parse={parseJaEllerNei}
                                name={`andreInntektskilder[${index}].sykmeldt`}>
                                    <input label={getLedetekst('sykepengesoknad.ja')} value>
                                        <div className="presisering blokk">
                                            <p className="sist">{getPresisering(field.annenInntektskildeType)}</p>
                                        </div>
                                    </input>
                                    <input label={getLedetekst('sykepengesoknad.nei')} value={false} />
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
};

const AndreInntektskilderComponent = () => {
    return <FieldArray component={VelgInntektskilder} fields={inntektskildetyper} name="andreInntektskilder" />;
};

export default AndreInntektskilderComponent;
