import React, { PropTypes } from 'react';
import JaEllerNei, { jaEllerNeiAlternativer, parseJaEllerNei } from '../JaEllerNei';
import Periodevelger from '../../skjema/Periodevelger';
import Checkbox from '../../skjema/Checkbox';
import Radioknapper from '../../skjema/Radioknapper';
import { FieldArray, Field } from 'redux-form';
import Feilomrade from '../../skjema/Feilomrade';
import { toDatePrettyPrint, getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../../utils/periodeUtils';

export const SoktOmSykepenger = ({ ledetekster }) => {
    return (<Field
        spoersmal={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal', ledetekster)}
        name="utenlandsopphold.soektOmSykepengerIPerioden"
        component={Radioknapper}
        Overskrift="h5"
        parse={parseJaEllerNei}>
            {
                jaEllerNeiAlternativer.map((alt, index) => {
                    return (<input {...alt} key={index}>
                        {
                            alt.value === true ? null : (<div className="presisering js-presisering">
                                <div dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.presisering-sykepenger-utlandet', ledetekster)} />
                            </div>)
                        }
                    </input>);
                })
            }
        </Field>);
};

SoktOmSykepenger.propTypes = {
    ledetekster: PropTypes.object,
};

export const RendreFeriePermisjonEllerUtenlandsopphold = ({ fields, meta, ledetekster }) => {
    const labels = {
        ferie: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie', ledetekster),
        permisjon: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon', ledetekster),
        utenlandsopphold: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge', ledetekster),
    };

    const getName = (field) => {
        return `harHatt${field[0].toUpperCase()}${field.substr(1)}`;
    };

    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">{getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har', ledetekster)}</h4>
        {
            fields.map((field, index) => {
                const name = `${getName(field)}`;
                return (<Field key={index} component={Checkbox} name={name} label={labels[field]} id={`checkbox-${field}`}>
                {
                    (() => {
                        if (field === 'utenlandsopphold') {
                            return (<div>
                                <div className="blokk">
                                    <Periodevelger name="utenlandsopphold.perioder" />
                                </div>
                                <SoktOmSykepenger ledetekster={ledetekster} />
                            </div>);
                        }
                        return <Periodevelger name={field} />;
                    })()
                }
                </Field>);
            })
        }
    </Feilomrade>);
};

RendreFeriePermisjonEllerUtenlandsopphold.propTypes = {
    fields: PropTypes.array,
    meta: PropTypes.object,
    ledetekster: PropTypes.object.isRequired,
};

const FeriePermisjonEllerUtenlandsopphold = ({ sykepengesoknad, ledetekster }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    return (<JaEllerNei
        spoersmal={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal', ledetekster, {
            '%FOM%': toDatePrettyPrint(tidligsteFom(perioder)),
            '%TOM%': toDatePrettyPrint(senesteTom(perioder)),
        })}
        name="harHattFeriePermisjonEllerUtenlandsopphold">
            <FieldArray component={RendreFeriePermisjonEllerUtenlandsopphold} name="feriePermisjonEllerUtenlandsopphold" fields={['ferie', 'permisjon', 'utenlandsopphold']} ledetekster={ledetekster} />
    </JaEllerNei>);
};

FeriePermisjonEllerUtenlandsopphold.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default FeriePermisjonEllerUtenlandsopphold;
