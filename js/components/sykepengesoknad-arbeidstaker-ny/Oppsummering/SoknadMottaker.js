import React, { Component } from 'react';
import { sykmelding as sykmeldingPt, getLedetekst } from 'digisyfo-npm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { skjemasvar as skjemasvarPt, soknadmottakerPt, soknad as soknadPt } from '../../../propTypes';
import { ARBEIDSGIVER, ARBEIDSGIVER_OG_NAV, NAV } from '../../../enums/soknadmottakertyper';
import { hentSoknadMottaker } from '../../../actions/soknadMeta_actions';
import populerSoknadMedSvar from '../../../utils/soknad-felles/populerSoknadMedSvar';
import { soknadMottakerSelector } from '../../../selectors/soknadMetaSelectors';

const mottakerTekst = (sendesTil, sykmelding) => {
    switch (sendesTil) {
        case NAV: {
            return getLedetekst('sykepengesoknad.oppsummering.nav-som-mottaker');
        }
        case ARBEIDSGIVER: {
            return getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': sykmelding.mottakendeArbeidsgiver.navn });
        }
        case ARBEIDSGIVER_OG_NAV: {
            return getLedetekst('sykepengesoknad.oppsummering.nav-og-arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': sykmelding.mottakendeArbeidsgiver.navn });
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
                {mottakerTekst(this.props.mottaker, this.props.sykmelding)}
            </p>);
    }
}

SoknadMottaker.propTypes = {
    mottaker: soknadmottakerPt,
    skjemasvar: skjemasvarPt,
    soknad: soknadPt,
    hentSoknadMottaker: PropTypes.func,
    hentingfeilet: PropTypes.bool,
    sykmelding: sykmeldingPt,
};

const mapStateToProps = (state, ownProps) => {
    const soknadMeta = state.soknadMeta[ownProps.soknad.id];
    return {
        mottaker: soknadMottakerSelector(state, ownProps.soknad.id),
        hentingfeilet: soknadMeta
            && soknadMeta.hentingFeilet,
    };
};

export default connect(mapStateToProps, { hentSoknadMottaker })(SoknadMottaker);
