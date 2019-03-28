import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import ArbeidsrettetOppfolging from './ArbeidsrettetOppfolging';
import Side from '../sider/SideStrippet';
import { hentOppfolging, hentSykmeldtinfodata } from '../actions/brukerinfo_actions';
import { selectLedeteksterHenter, selectLedeteksterHentingFeilet } from '../selectors/ledeteksterSelectors';
import {
    selectOppfolgingErUnderOppfolging,
    selectOppfolgingHenter,
    selectOppfolgingHentingFeilet,
    selectSykmeldtinfodataHenter,
    selectSykmeldtinfodataHentingFeilet,
    selectSykmeldtinfodataMaksdatoString,
} from '../reducers/brukerinfo';

class ArbeidsrettetOppfolgingSide extends Component {
    componentDidMount() {
        this.props.doHentOppfolging();
        this.props.doHentSykmeldtinfodata();
    }

    render() {
        const { henter, hentingFeilet, underOppfolging, maksDatoString } = this.props;
        return (
            <Side tittel={getLedetekst('ao.sidetittel')} laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } else if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (
                            <ArbeidsrettetOppfolging
                                underOppfolging={underOppfolging}
                                maksDato={maksDatoString}
                            />
                        );
                    })()
                }
            </Side>
        );
    }
}

ArbeidsrettetOppfolgingSide.propTypes = {
    doHentOppfolging: PropTypes.func,
    doHentSykmeldtinfodata: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    underOppfolging: PropTypes.bool,
    maksDatoString: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        henter: selectLedeteksterHenter(state)
            || selectOppfolgingHenter(state)
            || selectSykmeldtinfodataHenter(state),
        hentingFeilet: selectLedeteksterHentingFeilet(state)
            || selectOppfolgingHentingFeilet(state)
            || selectSykmeldtinfodataHentingFeilet(state),
        underOppfolging: selectOppfolgingErUnderOppfolging(state),
        maksDatoString: selectSykmeldtinfodataMaksdatoString(state),
    };
};

const actionCreators = {
    doHentOppfolging: hentOppfolging,
    doHentSykmeldtinfodata: hentSykmeldtinfodata,
};

export default connect(mapStateToProps, actionCreators)(ArbeidsrettetOppfolgingSide);
