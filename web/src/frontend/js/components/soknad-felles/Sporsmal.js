import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import JaEllerNei from './JaEllerNei';
import Undersporsmal from './Undersporsmal';
import { sporsmal as sporsmalPt } from '../../propTypes';
import {
    CHECKBOX,
    CHECKBOX_GRUPPE,
    DATO,
    FRITEKST,
    JA_NEI,
    PERIODER,
    PROSENT,
    TIMER,
} from '../../enums/svartyper';
import Perioder from './Perioder';
import Checkbox from './Checkbox';
import Tall from './Tall';
import Dato from './Dato';
import CheckboxGruppe from './CheckboxGruppe';
import Tekstinput from './Tekstinput';

const Sporsmal = ({ sporsmal, name }) => {
    const undersporsmal = sporsmal.undersporsmal.map((underspm) => {
        return underspm.svar !== null
            ? <Undersporsmal sporsmal={underspm} key={underspm.tag} />
            : null;
    });

    switch (sporsmal.svartype) {
        case DATO: {
            return (<Dato {...sporsmal} name={name}>
                { undersporsmal }
            </Dato>);
        }
        case TIMER: {
            return (<Tall {...sporsmal} name={name} label={getLedetekst('soknad.timer-totalt')}>
                { undersporsmal }
            </Tall>);
        }
        case PROSENT: {
            return (<Tall {...sporsmal} name={name} label={getLedetekst('soknad.prosent')}>
                { undersporsmal }
            </Tall>);
        }
        case CHECKBOX: {
            return (<Checkbox {...sporsmal} name={name}>
                { undersporsmal }
            </Checkbox>);
        }
        case PERIODER: {
            return (<Perioder {...sporsmal} name={name}>
                { undersporsmal }
            </Perioder>);
        }
        case JA_NEI: {
            return (<JaEllerNei {...sporsmal} name={name}>
                { undersporsmal }
            </JaEllerNei>);
        }
        case CHECKBOX_GRUPPE: {
            return (<CheckboxGruppe {...sporsmal} name={name}>
                { undersporsmal }
            </CheckboxGruppe>);
        }

        case FRITEKST: {
            return (<Tekstinput {...sporsmal} name={name}>
                { undersporsmal }
            </Tekstinput>);
        }

        default: {
            return null;
        }
    }
};

Sporsmal.propTypes = {
    sporsmal: sporsmalPt,
    name: PropTypes.string,
};

export default Sporsmal;
