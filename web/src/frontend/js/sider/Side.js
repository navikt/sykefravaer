import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import Feilmelding from '../components/Feilmelding';
import * as actions from '../actions/brukerinfo_actions';
import { brodsmule as brodsmulePt } from '../propTypes';

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
                { this.state.visSpinnerIDom && <div className="side__spinner">
                    <AppSpinner />
                </div> }
                <div className={begrenset || !erInnlogget ? 'side__innhold side__innhold--begrenset js-begrensning' : 'side__innhold'}>
                    { (begrenset || !erInnlogget) && <Brodsmuler brodsmuler={brodsmuler} /> }
                    { erInnlogget && children }
                    { !erInnlogget && <Utlogget /> }
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
