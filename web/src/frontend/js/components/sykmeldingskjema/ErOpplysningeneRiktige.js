import React from 'react';
import { FieldArray } from 'redux-form';
import { feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from 'digisyfo-npm';
import JaEllerNei from '../../components/sykepengesoknad/JaEllerNei';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';

const feilaktigeOpplysninger = Object.keys(feilaktigeOpplysningerEnums).map((key) => {
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
