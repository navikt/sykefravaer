import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst, Tidslinje, setHendelseData } from 'digisyfo-npm';
import Sidetopp from '../components/Sidetopp';
import TidslinjeVelgArbeidssituasjonContainer from './TidslinjeVelgArbeidssituasjonContainer';
import { hentTidslinjer } from '../actions/tidslinjer_actions';
import { brodsmule as brodsmulePt } from '../propTypes';

export class TidslinjeSide extends Component {
    componentWillMount() {
        const { dispatch, hashHendelser, arbeidssituasjon, forsoktHentet } = this.props;
        if (!forsoktHentet) {
            dispatch(hentTidslinjer(hashHendelser, arbeidssituasjon));
        }
    }

    setHendelseData(id, data) {
        const { dispatch } = this.props;
        dispatch(setHendelseData(id, data));
    }

    render() {
        const { brodsmuler, hendelser, arbeidssituasjon, tidslinjer, henter, forsoktHentet, hentingFeilet } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst')}</p>`,
        };
        return (<Side tittel={getLedetekst('tidslinje.sidetittel')} brodsmuler={brodsmuler} laster={henter || !forsoktHentet}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || (tidslinjer && tidslinjer.length === 0)) {
                        return (<Feilmelding />);
                    }
                    return (<div>
                        <Sidetopp tittel="Tidslinjen" htmlTekst={htmlIntro} />
                        <TidslinjeVelgArbeidssituasjonContainer arbeidssituasjon={arbeidssituasjon} />
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

TidslinjeSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    hendelser: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
    hashMilepaeler: PropTypes.array,
    apneHendelser: PropTypes.func,
    hashHendelser: PropTypes.array,
    tidslinjer: PropTypes.array,
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
    forsoktHentet: PropTypes.bool,
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
    const _apneHendelser = hendelser
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join('/');

    window.history.replaceState(null, null, `#${_apneHendelser}`);
}

export function mapStateToProps(state, ownProps) {
    let arbeidssituasjonParam = (ownProps && ownProps.params) ? ownProps.params.arbeidssituasjon : undefined;
    arbeidssituasjonParam = mapArbeidssituasjonParam(arbeidssituasjonParam);
    const arbeidssituasjon = arbeidssituasjonParam || state.brukerinfo.innstillinger.arbeidssituasjon || 'MED_ARBEIDSGIVER';
    const hendelser = state.tidslinjer && state.tidslinjer.data && state.tidslinjer.data.length ? state.tidslinjer.data[0].hendelser : [];
    if (hendelser.length) {
        setHash(hendelser);
    }
    const hashHendelser = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];
    return {
        arbeidssituasjon,
        hendelser,
        hashHendelser,
        tidslinjer: state.tidslinjer.data,
        henter: state.ledetekster.henter || state.tidslinjer.henter,
        forsoktHentet: state.tidslinjer.hentet === true,
        hentingFeilet: state.ledetekster.hentingFeilet || state.tidslinjer.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('tidslinje.sidetittel'),
        }],
    };
}

const TidslinjeContainer = connect(mapStateToProps)(TidslinjeSide);

export default TidslinjeContainer;
