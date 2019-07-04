/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TimeoutBox } from '@navikt/digisyfo-npm';
import cn from 'classnames';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import Feilmelding from '../components/Feilmelding';
import * as actions from '../data/brukerinfo/brukerinfo_actions';
import { brodsmule as brodsmulePt } from '../propTypes';
import { toggleHeleAppen } from '../toggles';

const DocumentTitle = require('react-document-title');

export const Utlogget = () => (
    <Feilmelding
        tittel="Du er logget ut!"
        melding="Hvis du vil fortsette å bruke denne tjenesten, må du logge deg inn på nytt." />
);

const LenkeTilSykefravaerArbeidsgiver = () => {
    const erHeroku = window.location.href.indexOf('herokuapp') > -1;
    return erHeroku
        ? (
            <div className="side__innhold side__innhold--begrenset">
                <a className="tilbakelenke" href="https://sykefravaerarbeidsgiver.herokuapp.com">Gå til øvingssiden Dine sykmeldte</a>
            </div>
        )
        : null;
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

export const getClassNames = (laster, erInnlogget) => cn('side', {
    'side--laster': laster && erInnlogget,
    'side--lastet': !laster || !erInnlogget,
});

const Hvitstyle = () => (
    <style dangerouslySetInnerHTML={{
        __html:
            'body { background-color: #fff }',
    }} />
);

const Plakat = () => (
    <div className="panel press">
        <div className="hode hode--advarsel">
            <h1 className="hode__tittel">Beklager! Vi har gjort en feil!</h1>
            <div className="hode__melding">
                <p>Vi jobber med å rette feilen, og håper å være tilbake så snart som mulig.</p>
            </div>
        </div>
    </div>
);

export class SideComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visSpinnerIDom: props.laster,
        };
    }

    componentWillMount() {
        const { sjekkInnlogging } = this.props;
        sjekkInnlogging();
    }

    componentWillReceiveProps(nextProps) {
        const { laster } = this.props;
        const { timeoutHandle } = this.state;
        if (laster && !nextProps.laster) {
            const _timeoutHandle = window.setTimeout(() => {
                this.setState({
                    visSpinnerIDom: false,
                });
            }, 100);
            this.setState({ timeoutHandle: _timeoutHandle });
        } else if (laster || nextProps.laster) {
            this.setState({
                visSpinnerIDom: true,
            });
            if (timeoutHandle) {
                window.clearTimeout(timeoutHandle);
            }
        }
    }

    render() {
        const {
            children, tittel, brodsmuler = [], laster, begrenset, erInnlogget, hvit,
        } = this.props;
        const { visSpinnerIDom } = this.state;
        const sideClassNames = cn(getClassNames(laster, erInnlogget));
        const innholdClassNames = cn('side__innhold', {
            'side__innhold--begrenset js-begrensning': (begrenset || !erInnlogget || !toggleHeleAppen()),
        });
        setAppClass(laster, erInnlogget);
        return (
            <DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
                <div className={sideClassNames} aria-busy={laster}>
                    { hvit && <Hvitstyle /> }
                    <TimeoutBox />
                    {
                        visSpinnerIDom && (
                            <div className="side__spinner">
                                <AppSpinner />
                            </div>
                        )
                    }
                    <div className={innholdClassNames}>
                        {(begrenset || !erInnlogget) && brodsmuler.length > 0 && <Brodsmuler brodsmuler={brodsmuler} />}
                        {erInnlogget && toggleHeleAppen() && children}
                        {erInnlogget && !toggleHeleAppen() && <Plakat />}
                        {!erInnlogget && <Utlogget />}
                        {erInnlogget && toggleHeleAppen() && <LenkeTilSykefravaerArbeidsgiver />}
                    </div>
                </div>
            </DocumentTitle>
        );
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
    hvit: PropTypes.bool,
};

export const mapStateToProps = state => ({
    ...state.brukerinfo.innlogging,
    hentingFeilet: state.brukerinfo.innlogging.hentingFeilet,
});

export default connect(mapStateToProps, actions)(SideComponent);
