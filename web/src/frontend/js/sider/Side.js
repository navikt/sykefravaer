import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TimeoutBox } from 'digisyfo-npm';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import Feilmelding from '../components/Feilmelding';
import * as actions from '../actions/brukerinfo_actions';
import { brodsmule as brodsmulePt } from '../propTypes';
import { Vis } from '../utils';

const DocumentTitle = require('react-document-title');

export const Utlogget = () => {
    return (<Feilmelding
        tittel="Du er logget ut!"
        melding="Hvis du vil fortsette å bruke denne tjenesten, må du logge deg inn på nytt." />);
};

export const setAppClass = (laster, erInnlogget) => {
    const el = document.getElementById('maincontent');
    if (el) {
        if (laster && erInnlogget) {
            el.className = 'app app--laster';
        } else {
            el.className = 'app';
        }
    }
};

export const getClassNames = (laster, erInnlogget) => {
    if (laster && erInnlogget) {
        return 'side side--laster';
    }
    return 'side side--lastet';
};

export class SideComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visSpinnerIDom: props.laster,
        };
    }

    componentWillMount() {
        this.props.sjekkInnlogging();
    }

    componentDidUpdate(prevProps) {
        if (!this.props.laster && prevProps.laster) {
            window.setTimeout(() => {
                this.setState({
                    visSpinnerIDom: false,
                });
            }, 800);
        }
    }

    render() {
        const { children, tittel, brodsmuler = [], laster, begrenset, erInnlogget } = this.props;
        const classNames = getClassNames(laster, erInnlogget);
        setAppClass(laster, erInnlogget);
        return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
            <div className={classNames} aria-busy={laster}>
                <TimeoutBox />
                <Vis hvis={this.state.visSpinnerIDom}>
                    <div className="side__spinner">
                        <AppSpinner />
                    </div>
                </Vis>
                <div className={begrenset || !erInnlogget ? 'side__innhold side__innhold--begrenset js-begrensning' : 'side__innhold'}>
                    <button onClick={this.props.hentSoknaderTest}>Test søknad</button>
                    <Vis hvis={begrenset || !erInnlogget}>
                        <Brodsmuler brodsmuler={brodsmuler} />
                    </Vis>
                    <Vis hvis={erInnlogget}>
                        {children}
                    </Vis>
                    <Vis hvis={!erInnlogget}>
                        <Utlogget />
                    </Vis>
                </div>
            </div>
        </DocumentTitle>);
    }
}

SideComponent.defaultProps = {
    brodsmuler: [],
    begrenset: true,
    laster: false,
    erInnlogget: true,
};

SideComponent.propTypes = {
    children: PropTypes.element,
    tittel: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    laster: PropTypes.bool,
    begrenset: PropTypes.bool,
    erInnlogget: PropTypes.bool,
    sjekkInnlogging: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
        ...state.brukerinfo.innlogging,
        hentingFeilet: state.brukerinfo.innlogging.hentingFeilet,
    };
};

export default connect(mapStateToProps, actions)(SideComponent);
