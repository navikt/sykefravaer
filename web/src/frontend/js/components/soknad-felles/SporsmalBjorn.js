import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Bjorn, getLedetekst } from 'digisyfo-npm';
import { formValueSelector } from 'redux-form';
import { getContextRoot } from '../../routers/paths';
import { SYKMELDINGSGRAD } from '../../enums/tagtyper';
import { formaterEnkeltverdi } from '../../components/soknad-felles/fieldUtils';
import { NEI } from '../../enums/svarEnums';
import { OPPHOLD_UTLAND_SKJEMA } from '../../enums/skjemanavn';

const sporsmalMedBjorn = {
    [SYKMELDINGSGRAD]: NEI,
};

const ledetekstNokler = {
    [SYKMELDINGSGRAD]: 'sykepengesoknad-utland.skjema.bjorn',
};

export const SporsmalBjornComponent = ({ vis, tag }) => {
    return vis
        ? (<Bjorn className="press" rootUrl={getContextRoot()}>
            <p>{ getLedetekst(ledetekstNokler[tag]) }</p>
        </Bjorn>)
        : null;
};

SporsmalBjornComponent.propTypes = {
    vis: PropTypes.bool,
    tag: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const selector = formValueSelector(OPPHOLD_UTLAND_SKJEMA);
    const feltVerdi = selector(state, ownProps.tag);
    return {
        vis: sporsmalMedBjorn[ownProps.tag] === undefined
            ? false
            : sporsmalMedBjorn[ownProps.tag] === formaterEnkeltverdi(feltVerdi),
    };
}

export default connect(mapStateToProps)(SporsmalBjornComponent);
