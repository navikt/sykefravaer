import React from 'react';
import PropTypes from 'prop-types';
import { soknad as soknadPt, sporsmal as sporsmalPt } from '../../propTypes';
import {
    CHECKBOX,
    DATO,
    PROSENT,
    TIMER,
    PERIODER,
    JA_NEI,
    CHECKBOX_GRUPPE,
    FRITEKST, CHECKBOX_PANEL, IKKE_RELEVANT,
} from '../../enums/svartyper';
import Sporsmal from './Sporsmal';

const Wrap = ({ children }) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};

Wrap.propTypes = {
    children: PropTypes.element,
};

const Undersporsmal = ({ sporsmal, soknad }) => {
    switch (sporsmal.svartype) {
        case CHECKBOX:
        case CHECKBOX_PANEL: {
            return <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad} />;
        }
        case DATO:
        case TIMER:
        case PROSENT:
        case PERIODER:
        case JA_NEI:
        case CHECKBOX_GRUPPE:
        case FRITEKST: {
            return (<Wrap>
                <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad} />
            </Wrap>);
        }
        case IKKE_RELEVANT: {
            return (<div className="ekstrasporsmal">
                <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad} />
            </div>);
        }
        default: {
            return null;
        }
    }
};

Undersporsmal.propTypes = {
    sporsmal: sporsmalPt,
    soknad: soknadPt,
};

export default Undersporsmal;
