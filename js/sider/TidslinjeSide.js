import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    TidslinjeVelgArbeidssituasjon,
    setHendelseData,
    hentTidslinjer,
} from '@navikt/digisyfo-npm';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import Sidetopp from '../components/Sidetopp';
import { hentSykeforloep } from '../data/sykeforloep/sykeforloep_actions';
import {
    brodsmule as brodsmulePt,
    tidslinjehendelse,
    sykeforloepPt,
} from '../propTypes';
import Tidslinje from '../tidslinje/Tidslinje';
import { toggleAktivitetskravInformasjon, toggleDialogmoteInformasjon } from '../data/unleash-toggles/unleashTogglesSelectors';

export class Container extends Component {
    constructor(props) {
        super(props);
        this.endreArbeidssituasjon = this.endreArbeidssituasjon.bind(this);
        this.setHendelseData = this.setHendelseData.bind(this);
    }

    componentWillMount() {
        const { doHentSykeforloep } = this.props;
        doHentSykeforloep();
    }

    componentWillReceiveProps(nextProps) {
        const {
            doHentTidslinjer, apneHendelseIder, sykeforloep, arbeidssituasjon,
        } = this.props;
        if (!sykeforloep.hentet && nextProps.sykeforloep.hentet) {
            doHentTidslinjer(apneHendelseIder, arbeidssituasjon, nextProps.sykeforloep.data);
        }
    }

    setHendelseData(id, data) {
        const { doSetHendelseData } = this.props;
        doSetHendelseData(id, data);
    }

    endreArbeidssituasjon(arbeidssituasjon) {
        const { doHentTidslinjer, sykeforloep } = this.props;
        doHentTidslinjer([], arbeidssituasjon, sykeforloep.data);
    }

    render() {
        const {
            brodsmuler, hendelser, arbeidssituasjon, henter, hentingFeilet, toggleHendelseUke7, toggleHendelseUke17,
        } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst')}</p>`,
        };
        return (
            <Side tittel={getLedetekst('tidslinje.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } if (hentingFeilet) {
                            return (<Feilmelding />);
                        }
                        return (
                            <div>
                                <Sidetopp tittel="Hva skjer under sykefraværet?" htmlTekst={htmlIntro} />
                                <TidslinjeVelgArbeidssituasjon
                                    valgtArbeidssituasjon={arbeidssituasjon}
                                    hentTidslinjer={this.endreArbeidssituasjon}
                                    endreUrl={history.replace}
                                    rootUrl={process.env.REACT_APP_CONTEXT_ROOT}
                                />
                                <Tidslinje
                                    hendelser={hendelser}
                                    arbeidssituasjon={arbeidssituasjon}
                                    setHendelseData={this.setHendelseData}
                                    toggleHendelseUke7={toggleHendelseUke7}
                                    toggleHendelseUke17={toggleHendelseUke17}
                                />
                            </div>
                        );
                    })()
                }
            </Side>
        );
    }
}

Container.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    hendelser: PropTypes.arrayOf(tidslinjehendelse),
    arbeidssituasjon: PropTypes.string,
    apneHendelseIder: PropTypes.arrayOf(PropTypes.string),
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
    sykeforloep: sykeforloepPt,
    doHentSykeforloep: PropTypes.func,
    doHentTidslinjer: PropTypes.func,
    doSetHendelseData: PropTypes.func,
    toggleHendelseUke7: PropTypes.bool,
    toggleHendelseUke17: PropTypes.bool,
};

export const mapArbeidssituasjonParam = (param) => {
    switch (param) {
        case 'uten-arbeidsgiver': {
            return 'UTEN_ARBEIDSGIVER';
        }
        case 'med-arbeidsgiver': {
            return 'MED_ARBEIDSGIVER';
        }
        case undefined: {
            return undefined;
        }
        default: {
            return 'MED_ARBEIDSGIVER';
        }
    }
};

export function setHash(hendelser) {
    const hendelserApne = hendelser
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join('/');

    window.history.replaceState(null, null, `#${hendelserApne}`);
}

export function mapStateToProps(state, ownProps) {
    let arbeidssituasjonParam = (ownProps && ownProps.params) ? ownProps.params.arbeidssituasjon : undefined;
    arbeidssituasjonParam = mapArbeidssituasjonParam(arbeidssituasjonParam);
    const arbeidssituasjon = arbeidssituasjonParam || state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const hendelser = state.tidslinjer && state.tidslinjer.data && state.tidslinjer.data.length ? state.tidslinjer.data[0].hendelser : [];
    if (hendelser.length) {
        setHash(hendelser);
    }
    const apneHendelseIder = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];

    const toggleHendelseUke7 = toggleAktivitetskravInformasjon(state);
    const toggleHendelseUke17 = toggleDialogmoteInformasjon(state);
    return {
        arbeidssituasjon,
        hendelser,
        apneHendelseIder,
        henter: state.ledetekster.henter
        || state.sykeforloep.henter,
        sykeforloep: state.sykeforloep,
        hentingFeilet: state.ledetekster.hentingFeilet
        || state.sykeforloep.hentingFeilet,
        toggleHendelseUke7,
        toggleHendelseUke17,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Hva skjer under sykefraværet?',
        }],
    };
}

const actionCreators = {
    doHentSykeforloep: hentSykeforloep,
    doHentTidslinjer: hentTidslinjer,
    doSetHendelseData: setHendelseData,
};
export default connect(mapStateToProps, actionCreators)(Container);
