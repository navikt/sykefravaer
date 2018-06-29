import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { mapDispatchToProps } from '../sykepengesoknad-felles/SykepengesoknadContainer';
import StrippetSide from '../../sider/StrippetSide';
import { FoerDuBegynner } from '../../components/sykepengesoknad-utland/FoerDuBegynner/FoerDuBegynner';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';


export const Container = ({ henter, hentingFeilet }) => {
    return (<StrippetSide tittel={ getLedetekst('sykepengesoknad-utland.sidetittel')} laster={henter }>
        {(() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            return <FoerDuBegynner />;
        })()}
    </StrippetSide>);
};

Container.propTypes = {
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        henter: state.ledetekster.henter,
        hentingFeilet: state.ledetekster.hentingFeilet,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);
