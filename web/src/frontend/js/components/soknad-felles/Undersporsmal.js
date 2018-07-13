import React from 'react';
import PropTypes from 'prop-types';
import { sporsmal as sporsmalPt } from '../../propTypes';
import {
    CHECKBOX,
    DATO,
    PROSENT,
    TIMER,
    PERIODER,
    JA_NEI,
    CHECKBOX_GRUPPE,
    FRITEKST, CHECKBOX_PANEL,
} from '../../enums/svartyper';
import Sporsmal from './Sporsmal';

const Wrap = ({ children }) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};

Wrap.propTypes = {
    children: PropTypes.element,
};

const Undersporsmal = ({ sporsmal }) => {
    switch (sporsmal.svartype) {
        case CHECKBOX:
        case CHECKBOX_PANEL: {
            return <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} />;
        }
        case DATO:
        case TIMER:
        case PROSENT:
        case PERIODER:
        case JA_NEI:
        case CHECKBOX_GRUPPE:
        case FRITEKST: {
            return (<Wrap>
                <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} />
            </Wrap>);
        }
        default: {
            return null;
        }
    }
};

Undersporsmal.propTypes = {
    sporsmal: sporsmalPt,
};

export default Undersporsmal;
