import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Bjorn, getLedetekst } from '@navikt/digisyfo-npm';
import { formValueSelector } from 'redux-form';
import { SYKMELDINGSGRAD, FERIE } from '../../enums/tagtyper';
import { formaterEnkeltverdi } from './fieldUtils';
import { NEI, JA } from '../../enums/svarEnums';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import { OPPHOLD_UTLAND } from '../../enums/soknadtyper';

const sporsmalMedBjorn = {
    [OPPHOLD_UTLAND]: {
        [SYKMELDINGSGRAD]: NEI,
        [FERIE]: JA,
    },
};

const ledetekstNokler = {
    [SYKMELDINGSGRAD]: 'sykepengesoknad-utland.skjema.bjorn',
    [FERIE]: 'sykepengesoknad-utland.skjema.ferie-sporsmal-bjorn',
};

export const SporsmalBjornComponent = ({ vis, tag }) => {
    return vis
        ? (<Bjorn className="press">
            <p>{getLedetekst(ledetekstNokler[tag])}</p>
        </Bjorn>)
        : null;
};

SporsmalBjornComponent.propTypes = {
    vis: PropTypes.bool,
    tag: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const skjemanavn = getSkjemanavnFraSoknad(ownProps.soknad);
    const selector = formValueSelector(skjemanavn);
    const feltVerdi = selector(state, ownProps.tag);
    const sporsmalMedBjornForSoknad = sporsmalMedBjorn[ownProps.soknad.soknadstype];
    const vis = !sporsmalMedBjornForSoknad || sporsmalMedBjornForSoknad[ownProps.tag] === undefined
        ? false
        : sporsmalMedBjornForSoknad[ownProps.tag] === formaterEnkeltverdi(feltVerdi);

    return {
        vis,
    };
}

export default connect(mapStateToProps)(SporsmalBjornComponent);
