import React, { PropTypes } from 'react';
import JaEllerNei, { jaEllerNeiAlternativer, parseJaEllerNei } from '../JaEllerNei';
import Periodevelger from './Periodevelger';
import Checkbox from '../../skjema/Checkbox';
import Radioknapper from '../../skjema/Radioknapper';
import { FieldArray, Field } from 'redux-form';
import Feilomrade from '../../skjema/Feilomrade';

const SoktOmSykepenger = () => {
    return (<Field
        spoersmal="Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?"
        name="utenlandsoppholdSoktOmSykepenger"
        component={Radioknapper}
        Overskrift="h5"
        parse={parseJaEllerNei}>
            {
                jaEllerNeiAlternativer.map((alt, index) => {
                    return (<input {...alt} key={index}>
                        {
                            alt.value === false && (<div className="presisering">
                                <p className="sist">Som hovedregel kan du bare få sykepenger når du oppholder deg i Norge. Du kan søke om å beholde sykepenger i en kort periode ved opphold utenfor Norge.</p>
                            </div>)
                        }
                    </input>);
                })
            }
        </Field>);
};

const FeriePermisjonEllerUtenlandsopphold = ({ fields, meta }) => {
    const labels = {
        ferie: 'tatt ut ferie',
        permisjon: 'hatt permisjon',
        utenlandsopphold: 'oppholdt meg utenfor Norge',
    };

    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">Jeg har...</h4>
    {
        fields.map((field, index) => {
            return (<Field key={index} component={Checkbox} name={`${field}.avkrysset`} label={labels[field]} id={`checkbox-${field}`}>
                <div className={field === 'utenlandsopphold' ? 'blokk' : ''}>
                    <Periodevelger name={`${field}.perioder`} />
                </div>
                {
                    field === 'utenlandsopphold' && <SoktOmSykepenger />
                }
            </Field>);
        })
    }
    </Feilomrade>);
};

FeriePermisjonEllerUtenlandsopphold.propTypes = {
    fields: PropTypes.object,
    meta: PropTypes.object,
};

const GjenopptattArbeidFulltUt = () => {
    return (<JaEllerNei
        spoersmal="Har du hatt ferie, permisjon eller oppholdt deg i utlandet i perioden 01.01.2017 – 31.01.2017?"
        name="harHattFeriePermisjonEllerUtenlandsopphold">
            <FieldArray component={FeriePermisjonEllerUtenlandsopphold} name="feriePermisjonEllerUtenlandsopphold" fields={['ferie', 'permisjon', 'utenlandsopphold']} />
    </JaEllerNei>);
};

export default GjenopptattArbeidFulltUt;
