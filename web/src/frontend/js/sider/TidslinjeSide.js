import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    Tidslinje,
    TidslinjeVelgArbeidssituasjon,
    setHendelseData,
    hentTidslinjer,
} from 'digisyfo-npm';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import Sidetopp from '../components/Sidetopp';
import { hentSykeforloep } from '../actions/sykeforloep_actions';
import { henterEllerHarHentetSykeforloep } from '../utils/reducerUtils';
import {
    brodsmule as brodsmulePt,
    tidslinjehendelse,
    sykeforloepPt,
} from '../propTypes/index';

export class Container extends Component {
    componentWillMount() {
        const { dispatch, sykeforloep } = this.props;
        if (!henterEllerHarHentetSykeforloep(sykeforloep)) {
            dispatch(hentSykeforloep());
        }
        this.endreArbeidssituasjon = this.endreArbeidssituasjon.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, apneHendelseIder, sykeforloep, arbeidssituasjon } = this.props;
        if (!sykeforloep.hentet && nextProps.sykeforloep.hentet) {
            dispatch(hentTidslinjer(apneHendelseIder, arbeidssituasjon, nextProps.sykeforloep.data));
        }
    }

    setHendelseData(id, data) {
        const { dispatch } = this.props;
        dispatch(setHendelseData(id, data));
    }

    endreArbeidssituasjon(arbeidssituasjon) {
        this.props.dispatch(hentTidslinjer([], arbeidssituasjon, this.props.sykeforloep.data));
    }

    render() {
        const { brodsmuler, hendelser, arbeidssituasjon, henter, hentingFeilet } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst')}</p>`,
        };
        return (<Side tittel={getLedetekst('tidslinje.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    }
                    return (<div>
                        <Sidetopp tittel="Hva skjer under sykefraværet?" htmlTekst={htmlIntro} />
                        <TidslinjeVelgArbeidssituasjon
                            valgtArbeidssituasjon={arbeidssituasjon}
                            hentTidslinjer={this.endreArbeidssituasjon}
                            endreUrl={history.replace}
                            rootUrl="/sykefravaer"
                        />
                        <Tidslinje
                            hendelser={hendelser}
                            arbeidssituasjon={arbeidssituasjon}
                            setHendelseData={(id, data) => {
                                this.setHendelseData(id, data);
                            }} />
                    </div>);
                })()
            }
        </Side>);
    }
}

Container.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    hendelser: PropTypes.arrayOf(tidslinjehendelse),
    arbeidssituasjon: PropTypes.string,
    apneHendelseIder: PropTypes.arrayOf(PropTypes.string),
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
    sykeforloep: sykeforloepPt,
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
    return {
        arbeidssituasjon,
        hendelser,
        apneHendelseIder,
        henter: state.ledetekster.henter
        || state.sykeforloep.henter,
        sykeforloep: state.sykeforloep,
        hentingFeilet: state.ledetekster.hentingFeilet
        || state.sykeforloep.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: 'Hva skjer under sykefraværet?',
        }],
    };
}

export default connect(mapStateToProps)(Container);
