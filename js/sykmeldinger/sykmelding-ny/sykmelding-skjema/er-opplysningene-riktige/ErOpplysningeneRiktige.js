import React from 'react';
import { FieldArray } from 'redux-form';
import { feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from '@navikt/digisyfo-npm';
import JaEllerNei from '../../../../components/skjema/JaEllerNei';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';

export const feilaktigeOpplysninger = Object.keys(feilaktigeOpplysningerEnums).map((key) => {
    return {
        opplysning: feilaktigeOpplysningerEnums[key],
    };
});

const ErOpplysningeneRiktige = (props) => {
    return (<JaEllerNei
        verdiMedTilleggssporsmal={false}
        spoersmal="Er opplysningene i sykmeldingen riktige?"
        name="opplysningeneErRiktige">
        <FieldArray
            {...props}
            component={HvilkeOpplysningerErIkkeRiktige}
            name="feilaktigeOpplysninger"
            fields={feilaktigeOpplysninger} />
    </JaEllerNei>);
};

export default ErOpplysningeneRiktige;
