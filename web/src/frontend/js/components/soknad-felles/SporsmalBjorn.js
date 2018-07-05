import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Bjorn, getLedetekst } from 'digisyfo-npm';
import { formValueSelector } from 'redux-form';
import { getContextRoot } from '../../routers/paths';
import { SYKMELDINGSGRAD } from '../../enums/tagtyper';
import { formaterEnkeltverdi } from '../../components/soknad-felles/fieldUtils';
import { NEI } from '../../enums/svarEnums';
import { SYKEPENGER_UTLAND } from '../../enums/soknadtyper';

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
    const selector = formValueSelector(SYKEPENGER_UTLAND);
    const val = selector(state, ownProps.tag);
    return {
        vis: sporsmalMedBjorn[ownProps.tag] === undefined
            ? false
            : sporsmalMedBjorn[ownProps.tag] === formaterEnkeltverdi(val),
    };
}

export default connect(mapStateToProps)(SporsmalBjornComponent);
