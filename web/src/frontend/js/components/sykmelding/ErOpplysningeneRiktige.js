import React, { PropTypes } from 'react';
import Radiogruppe from '../skjema/Radiogruppe';
import Checkboxgruppe from '../skjema/Checkboxgruppe';

export const HvilkeOpplysningerErIkkeRiktige = () => {
    return (<Checkboxgruppe spoersmaal="Hvilke opplysninger er ikke riktige?">
        <input value="periode" label="Periode" />
        <input value="sykmeldingsgrad" label="Sykmeldingsgrad" />
        <input value="arbeidsgiver" label="Arbeidsgiver" />
        <input value="diagnose" label="Diagnose" />
        <input value="andre" label="Andre opplysninger" />
    </Checkboxgruppe>);
};

const ErOpplysningeneRiktige = ({ sykmelding }) => {
    const valgtVerdi = (() => {
        switch (sykmelding.opplysningeneErRiktige) {
            case true: {
                return 'true';
            }
            case false: {
                return 'false';
            }
            default: {
                return undefined;
            }
        }
    })();

    return (<Radiogruppe spoersmaal="Er opplysningene i sykmeldingen riktige?" valgtVerdi={valgtVerdi} name="opplysningeneErRiktige">
        <input value="true" label="Ja, opplysningene er riktige" />
        <input value="false" label="Nei, opplysningene er ikke riktige">
            <HvilkeOpplysningerErIkkeRiktige />
        </input>
    </Radiogruppe>);
};

ErOpplysningeneRiktige.propTypes = {
    sykmelding: PropTypes.object.isRequired,
};

export default ErOpplysningeneRiktige;
