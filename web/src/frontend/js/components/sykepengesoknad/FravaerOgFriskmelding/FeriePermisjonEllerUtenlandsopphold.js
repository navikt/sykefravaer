import React, { PropTypes } from 'react';
import JaEllerNei, { jaEllerNeiAlternativer, parseJaEllerNei } from '../JaEllerNei';
import Periodevelger from '../../skjema/Periodevelger';
import Checkbox from '../../skjema/Checkbox';
import Radioknapper from '../../skjema/Radioknapper';
import { FieldArray, Field } from 'redux-form';
import Feilomrade from '../../skjema/Feilomrade';
import { toDatePrettyPrint, getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import * as periodeUtils from '../../../utils/periodeUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

export const SoktOmSykepenger = () => {
    return (<Field
        spoersmal={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal')}
        name="utenlandsopphold.soektOmSykepengerIPerioden"
        component={Radioknapper}
        Overskrift="h5"
        parse={parseJaEllerNei}>
            {
                jaEllerNeiAlternativer.map((alt, index) => {
                    return (<input {...alt} key={index}>
                        {
                            alt.value === true ? null : (<div className="presisering js-presisering">
                                <div
                                    className="redaksjonelt-innhold"
                                    dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.presisering-sykepenger-utlandet')} />
                            </div>)
                        }
                    </input>);
                })
            }
        </Field>);
};

export const RendreFeriePermisjonEllerUtenlandsopphold = ({ fields, meta, tidligsteFom, senesteTom }) => {
    const labels = {
        ferie: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie'),
        permisjon: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon'),
        utenlandsopphold: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge'),
    };

    const getName = (field) => {
        return `harHatt${field[0].toUpperCase()}${field.substr(1)}`;
    };

    return (<Feilomrade {...meta} id='feriePermisjonEllerUtenlandsopphold'>
        <h4 className="skjema__sporsmal">{getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har')}</h4>
        {
            fields.map((field, index) => {
                const name = `${getName(field)}`;
                return (<Field key={index} component={Checkbox} name={name} label={labels[field]} id={`checkbox-${field}`}>
                {
                    (() => {
                        if (field === 'utenlandsopphold') {
                            return (<div>
                                <div className="blokk">
                                    <Periodevelger name="utenlandsopphold.perioder" tidligsteFom={tidligsteFom} senesteTom={senesteTom} />
                                </div>
                                <SoktOmSykepenger />
                            </div>);
                        }
                        return <Periodevelger name={field} tidligsteFom={tidligsteFom} senesteTom={senesteTom} />;
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
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
};

const FeriePermisjonEllerUtenlandsopphold = ({ sykepengesoknad }) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const tidligsteFom = periodeUtils.tidligsteFom(perioder);
    const senesteTom = periodeUtils.senesteTom(perioder);

    return (<JaEllerNei
        spoersmal={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal', {
            '%FOM%': toDatePrettyPrint(tidligsteFom),
            '%TOM%': toDatePrettyPrint(senesteTom),
        })}
        name="harHattFeriePermisjonEllerUtenlandsopphold">
            <FieldArray
                component={RendreFeriePermisjonEllerUtenlandsopphold}
                name="feriePermisjonEllerUtenlandsopphold"
                fields={['ferie', 'permisjon', 'utenlandsopphold']}
                tidligsteFom={tidligsteFom}
                senesteTom={senesteTom} />
    </JaEllerNei>);
};

FeriePermisjonEllerUtenlandsopphold.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default FeriePermisjonEllerUtenlandsopphold;
