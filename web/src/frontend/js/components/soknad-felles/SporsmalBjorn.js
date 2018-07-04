import React from 'react';
import { connect } from 'react-redux';
import {getContextRoot} from "../../routers/paths";
import {Bjorn, getLedetekst} from "digisyfo-npm";
import {formValueSelector} from "redux-form";
import { SYKMELDINGSGRAD } from '../../enums/tagtyper'
import {SYKEPENGER_UTLAND_SKJEMANAVN} from "../../components/sykepengesoknad-utland/UtlandsSkjema/UtlandsSkjema";
import {formaterEnkeltverdi} from "../../components/soknad-felles/fieldUtils";
import {NEI} from "../../enums/svarEnums";

export const SporsmalBjornComponent = ({ vis, tag }) => {
    return vis
        ? (<Bjorn className="press" rootUrl={ getContextRoot() }>
                <p>{ getLedetekst(ledetekstNokler[tag]) }</p>
            </Bjorn>)
        : null
};

const sporsmalMedBjorn = {
    [SYKMELDINGSGRAD]: NEI,
};

const ledetekstNokler = {
    [SYKMELDINGSGRAD]: 'sykepengesoknad-utland.skjema.bjorn'
};

export function mapStateToProps(state, ownProps) {
    const selector = formValueSelector(SYKEPENGER_UTLAND_SKJEMANAVN);
    const val = selector(state, ownProps.tag);
    return {
        vis: sporsmalMedBjorn[ownProps.tag] === undefined
            ? false
            : sporsmalMedBjorn[ownProps.tag] === formaterEnkeltverdi(val)
    }
}

export default connect(mapStateToProps)(SporsmalBjornComponent);
