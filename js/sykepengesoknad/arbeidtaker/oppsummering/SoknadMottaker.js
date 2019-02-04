import React, { Component } from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { skjemasvar as skjemasvarPt, soknad as soknadPt, soknadmottakerPt } from '../../../propTypes';
import { ARBEIDSGIVER, ARBEIDSGIVER_OG_NAV, NAV } from '../../../enums/soknadmottakertyper';
import { hentSoknadMottaker } from '../../../actions/soknadMeta_actions';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';
import { soknadMottakerSelector } from '../../../selectors/soknadMetaSelectors';

const mottakerTekst = (sendesTil, mottakernavn) => {
    switch (sendesTil) {
        case NAV: {
            return getLedetekst('sykepengesoknad.oppsummering.nav-som-mottaker');
        }
        case ARBEIDSGIVER: {
            return getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': mottakernavn });
        }
        case ARBEIDSGIVER_OG_NAV: {
            return getLedetekst('sykepengesoknad.oppsummering.nav-og-arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': mottakernavn });
        }
        default: {
            return null;
        }
    }
};

class SoknadMottaker extends Component {
    componentDidMount() {
        this.hentMottaker();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.skjemasvar) !== JSON.stringify(this.props.skjemasvar)) {
            this.hentMottaker();
        }
    }

    hentMottaker() {
        const populertSoknad = populerSoknadMedSvar(this.props.soknad, this.props.skjemasvar);
        this.props.hentSoknadMottaker(populertSoknad);
    }

    render() {
        return this.props.hentingfeilet
            ? null
            : (<p className="js-mottaker sykepengerskjema__sendesTil">
                {mottakerTekst(this.props.mottaker, this.props.mottakernavn)}
            </p>);
    }
}

SoknadMottaker.propTypes = {
    skjemasvar: skjemasvarPt,
    soknad: soknadPt,
    mottakernavn: PropTypes.string,
    hentSoknadMottaker: PropTypes.func,
    mottaker: soknadmottakerPt,
    hentingfeilet: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
    const soknadMeta = state.soknadMeta[ownProps.soknad.id];
    return {
        mottaker: soknadMottakerSelector(state, ownProps.soknad.id),
        hentingfeilet: soknadMeta && soknadMeta.hentingFeilet,
    };
};

export default connect(mapStateToProps, { hentSoknadMottaker })(SoknadMottaker);
