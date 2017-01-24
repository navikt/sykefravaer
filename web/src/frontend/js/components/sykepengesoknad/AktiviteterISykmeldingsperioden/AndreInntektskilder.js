import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../skjema/Checkbox';
import { JaEllerNeiRadioknapper, parseJaEllerNei } from '../JaEllerNei';
import Feilomrade from '../../skjema/Feilomrade';

export const inntektskildeLabels = {
    andreArbeidsforhold: 'Andre arbeidsforhold',
    selvstendigNaeringsdrivende: 'Selvstendig næringsdrivende',
    selvstendigNaeringsdrivendeDagmamma: 'Selvstendig næringsdrivende dagmamma',
    jordbrukerFiskerReindriftsutoever: 'Jordbruker / Fisker / Reindriftsutøver',
    frilanser: 'Frilanser',
    annet: 'Annet',
};

const AndreInntektskilder = ({ fields, meta }) => {
    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">Hvilke andre inntektskilder har du?</h4>
        <p>Du trenger ikke oppgi andre ytelser fra NAV.</p>
        {
            fields.map((field, index) => {
                return (<Field label={inntektskildeLabels[field]} id={`inntektskilde-${index}`} name={`andreInntektskilder.${field}].avkrysset`} key={index} component={Checkbox}>
                    {
                        field !== 'annet' && <Field
                            component={JaEllerNeiRadioknapper}
                            spoersmal="Er du sykmeldt fra dette?"
                            parse={parseJaEllerNei}
                            name={`andreInntektskilder.${field}.sykmeldt`} />
                    }
                </Field>);
            })
        }
    </Feilomrade>);
};

AndreInntektskilder.propTypes = {
    fields: PropTypes.array,
    meta: PropTypes.object,
};

const AndreInntektskilderComponent = () => {
    const inntektskildetyper = [
        'andreArbeidsforhold',
        'selvstendigNaeringsdrivende',
        'selvstendigNaeringsdrivendeDagmamma',
        'jordbrukerFiskerReindriftsutoever',
        'frilanser',
        'annet',
    ];
    return <FieldArray component={AndreInntektskilder} fields={inntektskildetyper} name="andreInntektskilder" />;
};

export default AndreInntektskilderComponent;
