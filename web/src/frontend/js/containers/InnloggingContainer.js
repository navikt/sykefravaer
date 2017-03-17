import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/brukerinfo_actions';
import Feilmelding from '../components/Feilmelding';

export class Innlogging extends Component {
    constructor(props) {
        super(props);
        this.props.sjekkInnlogging();
    }

    render() {
        const { hentingFeilet, erInnlogget, children = null } = this.props;
        if (hentingFeilet) {
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
    hentingFeilet: PropTypes.bool,
    erInnlogget: PropTypes.bool,
    children: PropTypes.object,
};

export const mapStateToProps = (state) => {
    return state.brukerinfo.innlogging;
};

export default connect(mapStateToProps, actions)(Innlogging);
