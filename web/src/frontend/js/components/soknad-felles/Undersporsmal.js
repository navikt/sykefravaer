import React from 'react';
import PropTypes from 'prop-types';
import { sporsmal as sporsmalPt } from '../../propTypes';
import { CHECKBOX, DATO, PROSENT, TIMER, PERIODER, JA_NEI, CHECKBOX_GRUPPE } from '../../enums/svartyper';
import Tall from './Tall';
import Dato from './Dato';
import Checkbox from './Checkbox';
import Perioder from './Perioder';
import JaEllerNei from './JaEllerNei';
import CheckboxGruppe from './CheckboxGruppe';

const Wrap = ({ children }) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};

Wrap.propTypes = {
    children: PropTypes.element,
};

const Undersporsmal = ({ sporsmal }) => {
    switch (sporsmal.svar.svartype) {
        case DATO: {
            return (<Wrap>
                <Dato {...sporsmal} name={sporsmal.tag} />
            </Wrap>);
        }
        case TIMER: {
            return (<Wrap>
                <Tall {...sporsmal} name={sporsmal.tag} label="timer totalt" />
            </Wrap>);
        }
        case PROSENT: {
            return (<Wrap>
                <Tall {...sporsmal} name={sporsmal.tag} label="prosent" />
            </Wrap>);
        }
        case CHECKBOX: {
            return <Checkbox {...sporsmal} name={sporsmal.tag} />;
        }
        case PERIODER: {
            return (<Wrap>
                <Perioder {...sporsmal} name={sporsmal.tag} />
            </Wrap>);
        }
        case JA_NEI: {
            return (<Wrap>
                <JaEllerNei {...sporsmal} name={sporsmal.tag} />
            </Wrap>);
        }
        case CHECKBOX_GRUPPE: {
            return (<Wrap>
                <CheckboxGruppe {...sporsmal} name={sporsmal.tag} />
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
