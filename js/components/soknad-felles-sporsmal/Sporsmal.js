import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { bindActionCreators } from 'redux';
import JaEllerNei from './JaEllerNei';
import Undersporsmal from './Undersporsmal';
import { sporsmal as sporsmalPt, soknad as soknadPt } from '../../propTypes/index';
import {
    CHECKBOX,
    CHECKBOX_GRUPPE,
    DATO,
    FRITEKST,
    JA_NEI,
    PERIODER,
    PROSENT,
    TIMER,
    IKKE_RELEVANT, CHECKBOX_PANEL,
} from '../../enums/svartyper';
import Perioder from './Perioder';
import Checkbox from './Checkbox';
import Tall from './Tall';
import Dato from './Dato';
import CheckboxGruppe from './CheckboxGruppe';
import Tekstinput from './Tekstinput';
import IkkeRelevant from './IkkeRelevant';
import Checkboxpanel from './Checkboxpanel';
import { soknadEndret } from '../../actions/soknader_actions';

export const SporsmalComponent = ({ sporsmal, name, hovedsporsmal, ekstraProps, actions, soknad }) => {
    const undersporsmal = sporsmal.undersporsmal.map((underspm) => {
        return underspm.svar !== null
            ? <Undersporsmal sporsmal={underspm} key={underspm.tag} soknad={soknad} />
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
            return (<Perioder {...sporsmal} {...ekstraProps} name={name}>
                { undersporsmal }
            </Perioder>);
        }
        case JA_NEI: {
            return (<JaEllerNei
                {...sporsmal}
                name={name}
                hovedsporsmal={hovedsporsmal}
                soknad={soknad}
                actions={actions}>
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
        case IKKE_RELEVANT: {
            return (<IkkeRelevant {...sporsmal} name={name} >
                { undersporsmal }
            </IkkeRelevant>);
        }
        case CHECKBOX_PANEL: {
            return (<Checkboxpanel {...sporsmal} name={name}>
                { undersporsmal }
            </Checkboxpanel>);
        }
        default: {
            return null;
        }
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ soknadEndret }, dispatch),
    };
}

SporsmalComponent.propTypes = {
    sporsmal: sporsmalPt,
    name: PropTypes.string,
    hovedsporsmal: PropTypes.bool,
    ekstraProps: PropTypes.shape(),
    actions: PropTypes.shape(),
    soknad: soknadPt,
};

export default connect(null, mapDispatchToProps)(SporsmalComponent);
