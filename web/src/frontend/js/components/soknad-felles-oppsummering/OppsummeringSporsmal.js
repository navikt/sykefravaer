import React from 'react';
import PropTypes from 'prop-types';
import { CHECKBOX, CHECKBOX_GRUPPE, DATO, JA_NEI, PERIODER, PROSENT, TIMER } from '../../enums/svartyper';
import OppsummeringPerioder from './OppsummeringPerioder';
import OppsummeringDato from './OppsummeringDato';
import OppsummeringCheckboxgruppe from './OppsummeringCheckboxgruppe';
import OppsummeringTall from './OppsummeringTall';
import OppsummeringCheckbox from './OppsummeringCheckbox';
import OppsummeringJaEllerNei from './OppsummeringJaEllerNei';
import { svartypePt } from '../../propTypes';

const OppsummeringSporsmal = (props) => {
    switch (props.svartype) {
        case CHECKBOX: {
            return <OppsummeringCheckbox {...props} />;
        }
        case JA_NEI: {
            return <OppsummeringJaEllerNei {...props} />;
        }
        case DATO: {
            return <OppsummeringDato {...props} />;
        }
        case PERIODER: {
            return <OppsummeringPerioder {...props} />;
        }
        case CHECKBOX_GRUPPE: {
            return (<OppsummeringCheckboxgruppe {...props} />);
        }
        case PROSENT:
        case TIMER: {
            return <OppsummeringTall {...props} />;
        }
        default: {
            return null;
        }
    }
};

OppsummeringSporsmal.propTypes = {
    svartype: svartypePt,
    overskriftsnivaa: PropTypes.number,
};

export default OppsummeringSporsmal;
