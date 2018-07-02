import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import StrippetSide from '../../sider/StrippetSide';
import { FoerDuBegynner } from '../../components/sykepengesoknad-utland/FoerDuBegynner/FoerDuBegynner';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { opprettSoknadUtland } from '../../actions/soknader_actions';

export const Container = ({ henter, hentingFeilet, opprettSoknad, opprettFeilet, oppretterSoknad }) => {
    return (<StrippetSide tittel={getLedetekst('sykepengesoknad-utland.sidetittel')} laster={henter}>
        {(() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            return (<FoerDuBegynner
                opprettSoknad={opprettSoknad}
                opprettFeilet={opprettFeilet}
                oppretterSoknad={oppretterSoknad}
            />);
        })()}
    </StrippetSide>);
};

Container.propTypes = {
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
    opprettFeilet: PropTypes.bool,
    oppretterSoknad: PropTypes.bool,
    opprettSoknad: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
        opprettFeilet: state.soknader.opprettFeilet,
        oppretterSoknad: state.soknader.oppretterSoknad,
    };
}


export default connect(mapStateToProps, { opprettSoknad: opprettSoknadUtland })(Container);
