import React from 'react';
import { FieldArray } from 'redux-form';
import JaEllerNei from '../../components/sykepengesoknad/JaEllerNei';
import feilaktigeOpplysningerFields from '../../enums/feilaktigeOpplysninger';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';

const ErOpplysningeneRiktige = (props) => {
    return (<JaEllerNei
        verdiMedTilleggssporsmal={false}
        spoersmal="Er opplysningene i sykmeldingen riktige?"
        name="opplysningeneErRiktige">
        <FieldArray
            {...props}
            component={HvilkeOpplysningerErIkkeRiktige}
            name="feilaktigeOpplysninger"
            fields={feilaktigeOpplysningerFields} />
    </JaEllerNei>);
};

export default ErOpplysningeneRiktige;
