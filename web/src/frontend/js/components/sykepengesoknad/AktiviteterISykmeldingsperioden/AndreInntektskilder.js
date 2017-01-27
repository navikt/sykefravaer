import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../skjema/Checkbox';
import { JaEllerNeiRadioknapper, parseJaEllerNei } from '../JaEllerNei';
import Feilomrade from '../../skjema/Feilomrade';

const ANDRE_ARBEIDSFORHOLD = 'ANDRE_ARBEIDSFORHOLD';
const SELVSTENDIG_NAERINGSDRIVENDE = 'SELVSTENDIG_NAERINGSDRIVENDE';
const SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA = 'SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA';
const JORDBRUKER_FISKER_REINDRIFTSUTOEVER = 'JORDBRUKER_FISKER_REINDRIFTSUTOEVER';
const FRILANSER = 'FRILANSER';
const ANNET = 'ANNET';

export const inntektskildeLabels = {};
inntektskildeLabels[ANDRE_ARBEIDSFORHOLD] = 'Andre arbeidsforhold';
inntektskildeLabels[SELVSTENDIG_NAERINGSDRIVENDE] = 'Selvstendig næringsdrivende';
inntektskildeLabels[SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA] = 'Selvstendig næringsdrivende dagmamma';
inntektskildeLabels[JORDBRUKER_FISKER_REINDRIFTSUTOEVER] = 'Jordbruker / Fisker / Reindriftsutøver';
inntektskildeLabels[FRILANSER] = 'Frilanser';
inntektskildeLabels[ANNET] = 'Annet';

const AndreInntektskilder = ({ fields, meta }) => {
    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">Hvilke andre inntektskilder har du?</h4>
        <p>Du trenger ikke oppgi andre ytelser fra NAV.</p>
        {
            fields.map((field, index) => {
                return (<Field label={inntektskildeLabels[field]} id={`inntektskilde-${index}`} name={`andreInntektskilder.${field}].avkrysset`} key={index} component={Checkbox}>
                    {
                        field === ANNET ? null : <Field
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
    const fields = [
        ANDRE_ARBEIDSFORHOLD,
        SELVSTENDIG_NAERINGSDRIVENDE,
        SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA,
        JORDBRUKER_FISKER_REINDRIFTSUTOEVER,
        FRILANSER,
        ANNET,
    ];
    return <FieldArray component={AndreInntektskilder} fields={fields} name="andreInntektskilder" />;
};

export default AndreInntektskilderComponent;
