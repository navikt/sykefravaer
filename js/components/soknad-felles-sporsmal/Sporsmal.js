import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { bindActionCreators } from 'redux';
import JaEllerNei from './JaEllerNei';
import { sporsmal as sporsmalPt, soknad as soknadPt } from '../../propTypes';
import {
    CHECKBOX,
    CHECKBOX_GRUPPE,
    DATO,
    FRITEKST,
    JA_NEI,
    PERIODER,
    PROSENT,
    TIMER,
    IKKE_RELEVANT,
    CHECKBOX_PANEL,
    TALL,
    RADIO_GRUPPE,
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
import UkjentSporsmal from './UkjentSporsmal';
import RadioGruppe from './RadioGruppe';
import Undersporsmalsliste from './Undersporsmalsliste';

export const SporsmalComponent = ({ sporsmal, name, hovedsporsmal, ekstraProps, actions, soknad }) => {
    const undersporsmalsliste = <Undersporsmalsliste undersporsmal={sporsmal.undersporsmal} soknad={soknad} />;

    switch (sporsmal.svartype) {
        case DATO: {
            return (<Dato {...sporsmal} name={name}>
                { undersporsmalsliste }
            </Dato>);
        }
        case TIMER: {
            return (<Tall {...sporsmal} name={name} label={getLedetekst('soknad.timer-totalt')}>
                { undersporsmalsliste }
            </Tall>);
        }
        case PROSENT: {
            return (<Tall {...sporsmal} name={name} label={getLedetekst('soknad.prosent')}>
                { undersporsmalsliste }
            </Tall>);
        }
        case TALL: {
            return (<Tall {...sporsmal} name={name} label={sporsmal.undertekst}>
                { undersporsmalsliste }
            </Tall>);
        }
        case CHECKBOX: {
            return (<Checkbox {...sporsmal} name={name}>
                { undersporsmalsliste }
            </Checkbox>);
        }
        case PERIODER: {
            return (<Perioder {...sporsmal} {...ekstraProps} name={name}>
                { undersporsmalsliste }
            </Perioder>);
        }
        case JA_NEI: {
            return (<JaEllerNei
                {...sporsmal}
                name={name}
                hovedsporsmal={hovedsporsmal}
                soknad={soknad}
                actions={actions}>
                { undersporsmalsliste }
            </JaEllerNei>);
        }
        case CHECKBOX_GRUPPE: {
            return (<CheckboxGruppe {...sporsmal} name={name}>
                { undersporsmalsliste }
            </CheckboxGruppe>);
        }
        case FRITEKST: {
            return (<Tekstinput {...sporsmal} name={name}>
                { undersporsmalsliste }
            </Tekstinput>);
        }
        case IKKE_RELEVANT: {
            return (<IkkeRelevant {...sporsmal} name={name} >
                { undersporsmalsliste }
            </IkkeRelevant>);
        }
        case CHECKBOX_PANEL: {
            return (<Checkboxpanel {...sporsmal} name={name}>
                { undersporsmalsliste }
            </Checkboxpanel>);
        }
        case RADIO_GRUPPE: {
            return (<RadioGruppe
                {...sporsmal}
                name={name}
                soknad={soknad}
                actions={actions} />);
        }
        default: {
            return <UkjentSporsmal sporsmal={sporsmal} />;
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
