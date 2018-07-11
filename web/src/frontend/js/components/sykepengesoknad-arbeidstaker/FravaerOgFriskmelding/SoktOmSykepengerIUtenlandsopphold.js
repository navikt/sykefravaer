import React from 'react';
import { connect } from 'react-redux';
import { getHtmlLedetekst, getLedetekst, tilDatePeriode } from 'digisyfo-npm';
import { Field, getFormValues } from 'redux-form';
import { jaEllerNeiAlternativer, parseJaEllerNei } from '../JaEllerNei';
import Radioknapper from '../../skjema/Radioknapper';
import { SYKEPENGER_SKJEMANAVN } from '../../../enums/skjemanavn';
import { datoErHelgedag, erGyldigPeriode, tilDager } from '../../../utils/periodeUtils';

const tilTimestamp = (dato) => {
    return dato.getTime();
};

export const visSoktOmSykepengerUtenlandsoppholdsporsmal = (values) => {
    const utenlandsoppholdperioder = values.utenlandsopphold.perioder.filter(erGyldigPeriode).map(tilDatePeriode);
    const ferieperioder = values.ferie ? values.ferie.filter(erGyldigPeriode).map(tilDatePeriode) : [];
    const utenlandsoppholddager = tilDager(utenlandsoppholdperioder).map(tilTimestamp);
    const feriedager = tilDager(ferieperioder).map(tilTimestamp);
    return utenlandsoppholddager.some((dag) => {
        return datoErHelgedag(new Date(dag))
            ? false
            : feriedager.indexOf(dag) === -1;
    });
};

export const Sporsmal = ({ vis }) => {
    return vis && (<div className="utenlandsoppholdsporsmal">
        <Field
            spoersmal={getLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.sokt-om-sykepenger.sporsmal')}
            name="utenlandsopphold.soektOmSykepengerIPerioden"
            component={Radioknapper}
            Overskrift="h5"
            parse={parseJaEllerNei}>
            {
                jaEllerNeiAlternativer.map((alt, index) => {
                    return (<i {...alt} key={index}>
                        {
                            alt.value === true ? null : (<div className="presisering js-presisering">
                                <div
                                    className="redaksjonelt-innhold"
                                    dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.ferie-permisjon-utenlandsopphold.presisering-sykepenger-utlandet')} />
                            </div>)
                        }
                    </i>);
                })
            }
        </Field>
    </div>);
};

const mapStateToProps = (state) => {
    const values = getFormValues(SYKEPENGER_SKJEMANAVN)(state);

    return {
        vis: visSoktOmSykepengerUtenlandsoppholdsporsmal(values),
    };
};

export default connect(mapStateToProps)(Sporsmal);
