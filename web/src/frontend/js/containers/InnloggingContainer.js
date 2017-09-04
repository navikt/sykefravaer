import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/brukerinfo_actions';
import Feilmelding from '../components/Feilmelding';
import Side from '../sider/Side';

const Utlogget = () => {
    return (<Feilmelding
        tittel="Du er logget ut!"
        melding="Hvis du vil fortsette å bruke denne tjenesten, må du logge deg inn på nytt." />);
};

export class Innlogging extends Component {
    componentWillMount() {
        this.props.sjekkInnlogging();
    }

    render() {
        const { hentingFeilet, erInnlogget, children = null, visSmuler = false } = this.props;
        if (hentingFeilet && !visSmuler) {
            return <Feilmelding />;
        } 
        if (hentingFeilet && visSmuler) {
            return (<Side tittel="Det oppstod en feil">
                <Feilmelding />;
            </Side>);
        } 
        if (erInnlogget === false && !visSmuler) {
            return <Utlogget />;
        }
        if (erInnlogget === false && visSmuler) {
            return (<Side tittel="Du er logget ut!">
                <Utlogget />;
            </Side>);
        }
        return children;
    }
};

Innlogging.propTypes = {
    sjekkInnlogging: PropTypes.func,
    hentingFeilet: PropTypes.bool,
    erInnlogget: PropTypes.bool,
    children: PropTypes.object,
};

export const mapStateToProps = (state) => {
    return Object.assign({}, state.brukerinfo.innlogging, {
        hentingFeilet: state.brukerinfo.innlogging.hentingFeilet || state.brukerinfo.bruker.hentingFeilet,
    });
};

export default connect(mapStateToProps, actions)(Innlogging);
