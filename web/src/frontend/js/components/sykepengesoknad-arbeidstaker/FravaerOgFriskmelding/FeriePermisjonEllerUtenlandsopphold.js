import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, Field } from 'redux-form';
import { getLedetekst, Bjorn } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { getContextRoot } from '../../../routers/paths';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/datovelger/Periodevelger';
import Checkbox from '../../skjema/Checkbox';
import Feilomrade from '../../skjema/Feilomrade';
import connectGjenopptattArbeidFulltUtDato from '../../../utils/connectGjenopptattArbeidFulltUtDato';
import { sykepengesoknad as sykepengesoknadPt, fieldPropTypes } from '../../../propTypes';
import { getFeriePermisjonEllerUtenlandsoppholdSporsmal } from '../Oppsummering/sykepengesoknadSporsmal';
import { finnFomForFeriesporsmal, getTomDato } from '../../../utils/sykepengesoknadUtils';
import SoktOmSykepenger from './SoktOmSykepengerIUtenlandsopphold';

export const RendreFeriePermisjonEllerUtenlandsopphold = ({ fields, meta, tidligsteFom, senesteTom, sykepengesoknad }) => {
    const labels = {
        ferie: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.tatt-ut-ferie'),
        permisjon: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.hatt-permisjon'),
        utenlandsopphold: getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.oppholdt-meg-utenfor-norge'),
    };

    const getName = (field) => {
        return `harHatt${field[0].toUpperCase()}${field.substr(1)}`;
    };

    return (<Feilomrade {...meta} id="feriePermisjonEllerUtenlandsopphold">
        <h4 className="skjema__sporsmal">{getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.jeg-har')}</h4>
        {
            fields.map((field, index) => {
                const name = `${getName(field)}`;
                return (<Field key={index} component={Checkbox} name={name} label={labels[field]} id={`checkbox-${field}`}>
                    {
                        (() => {
                            if (field === 'utenlandsopphold') {
                                return (<div>
                                    <Periodevelger name="utenlandsopphold.perioder" tidligsteFom={tidligsteFom} senesteTom={senesteTom} />
                                    <SoktOmSykepenger sykepengesoknad={sykepengesoknad} />
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
    fields: PropTypes.arrayOf(PropTypes.string),
    meta: fieldPropTypes.meta,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    sykepengesoknad: sykepengesoknadPt,
};

export const FeriePermisjonEllerUtenlandsoppholdComp = ({ sykepengesoknad, gjenopptattArbeidFulltUtDato }) => {
    const _soknad = {
        ...sykepengesoknad,
        gjenopptattArbeidFulltUtDato,
    };

    const tidligsteFom = finnFomForFeriesporsmal(sykepengesoknad);
    const visBjorn = tidligsteFom.getTime() !== sykepengesoknad.fom.getTime();
    const feriebjorn = visBjorn ? <Bjorn className="press" nokkel="sykepengesoknad.ferie.bjorn" rootUrl={getContextRoot()} /> : null;
    const senesteTom = getTomDato(_soknad);
    const hjelpetekst = (<Hjelpetekst
        id="ferie-permisjon-hjelpetekst">{getLedetekst('sykepengesoknad.ferie.hjelpetekst.tekst')}</Hjelpetekst>);

    return (<JaEllerNei
        spoersmal={getFeriePermisjonEllerUtenlandsoppholdSporsmal(sykepengesoknad, gjenopptattArbeidFulltUtDato)}
        name="harHattFeriePermisjonEllerUtenlandsopphold"
        informasjon={feriebjorn}
        hjelpetekst={hjelpetekst}>
        <FieldArray
            sykepengesoknad={sykepengesoknad}
            component={RendreFeriePermisjonEllerUtenlandsopphold}
            name="feriePermisjonEllerUtenlandsopphold"
            fields={['ferie', 'permisjon', 'utenlandsopphold']}
            tidligsteFom={tidligsteFom}
            senesteTom={senesteTom} />
    </JaEllerNei>);
};

FeriePermisjonEllerUtenlandsoppholdComp.propTypes = {
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
    sykepengesoknad: sykepengesoknadPt,
};

const FeriePermisjonEllerUtenlandsopphold = connectGjenopptattArbeidFulltUtDato(FeriePermisjonEllerUtenlandsoppholdComp);

export default FeriePermisjonEllerUtenlandsopphold;
