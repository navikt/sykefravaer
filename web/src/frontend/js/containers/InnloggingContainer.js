import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/brukerinfo_actions';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';

export class Innlogging extends Component {
    constructor(props) {
        super(props);
        this.props.sjekkInnlogging();
    }

    render() {
        const { henter, hentingFeilet, erInnlogget, children } = this.props;
        if (henter) {
            return <AppSpinner />;
        } else if (hentingFeilet) {
            return <Feilmelding />;
        } else if (erInnlogget === false) {
            return (<Feilmelding
                tittel="Du er logget ut!"
                melding="Hvis du vil fortsette å bruke denne tjenesten, må du logge deg inn på nytt." />);
        }
        return children;
    }
}

Innlogging.propTypes = {
    sjekkInnlogging: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    erInnlogget: PropTypes.bool,
    children: PropTypes.object,
};

export const mapStateToProps = (state) => {
    return {
        henter: state.brukerinfo.bruker.henter,
        hentingFeilet: state.brukerinfo.bruker.hentingFeilet,
        erInnlogget: state.brukerinfo.bruker.data.erInnlogget,
    };
};

export default connect(mapStateToProps, actions)(Innlogging);
