import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from '../../skjema/Checkbox';
import { parseJaEllerNei } from '../JaEllerNei';
import Feilomrade from '../../skjema/Feilomrade';
import Radioknapper from '../../skjema/Radioknapper';

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

const presiseringer = {};
presiseringer[ANDRE_ARBEIDSFORHOLD] = 'Legen må sende inn én sykmelding for hvert arbeidsforhold du er sykmeldt fra. Du kan altså ikke bruke samme sykmelding overfor flere arbeidsgivere. Det betyr også at du må sende en egen søknad om sykepenger for hver av sykmeldingene.';
presiseringer[SELVSTENDIG_NAERINGSDRIVENDE] = 'Legen må sende inn én sykmelding for hver arbeidssituasjon du er sykmeldt fra, og du må søke om sykepenger for hver av dem. Foreløpig støtter ikke den digitale løsningen søknad om sykepenger for selvstendig næringsdrivende. Søknaden om sykepenger for dette må du derfor sende på papir.';
presiseringer[SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA] = 'Legen må sende inn én sykmelding for hver arbeidssituasjon du er sykmeldt fra, og du må søke om sykepenger for hver av dem. Foreløpig støtter ikke den digitale løsningen søknad om sykepenger for selvstendig næringsdrivende. Søknaden om sykepenger for dagmamma må du derfor sende på papir.';
presiseringer[JORDBRUKER_FISKER_REINDRIFTSUTOEVER] = 'Legen må sende inn én sykmelding for hver arbeidssituasjon du er sykmeldt fra, og du må søke om sykepenger for hver av dem . Foreløpig støtter ikke den digitale løsningen søknad om sykepenger for disse gruppene. Søknaden om sykepenger for dette må du derfor sende på papir.';
presiseringer[FRILANSER] = 'Legen må sende inn én sykmelding for hver arbeidssituasjon du er sykmeldt fra, og du må søke om sykepenger for hver av dem. Foreløpig støtter ikke den digitale løsningen søknad om sykepenger for frilansere. Søknaden om sykepenger for frilanser må du derfor sende på papir.';

const AndreInntektskilder = ({ fields, meta }) => {
    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">Hvilke andre inntektskilder har du?</h4>
        <p>Du trenger ikke oppgi andre ytelser fra NAV.</p>
        {
            fields.map((field, index) => {
                return (<Field label={inntektskildeLabels[field]} id={`inntektskilde-${index}`} name={`andreInntektskilder.${field}.avkrysset`} key={index} component={Checkbox}>
                    {
                        field === ANNET ? null : <Field
                            component={Radioknapper}
                            spoersmal="Er du sykmeldt fra dette?"
                            parse={parseJaEllerNei}
                            name={`andreInntektskilder.${field}.sykmeldt`}>
                                <input label="Ja" value>
                                    <div className="presisering blokk">
                                        <p className="sist">{presiseringer[field]}</p>
                                    </div>
                                </input>
                                <input label="Nei" value={false} />
                            </Field>
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
