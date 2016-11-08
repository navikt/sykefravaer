import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SideMedHoyrekolonne from '../sider/SideMedHoyrekolonne';
import Tidslinje from '../components/tidslinje/Tidslinje';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getLedetekst } from 'digisyfo-npm';
import { hentTidslinjer } from '../actions/tidslinjer_actions';
import { setHendelseData } from '../actions/hendelser_actions';
import Sidetopp from '../components/Sidetopp';
import TidslinjeVelgArbeidssituasjonContainer from './TidslinjeVelgArbeidssituasjonContainer';

export class TidslinjeSide extends Component {

    componentWillMount() {
        const { dispatch, hashHendelser, arbeidssituasjon } = this.props;
        dispatch(hentTidslinjer(hashHendelser, arbeidssituasjon));
    }

    setHendelseData(id, data) {
        const { dispatch } = this.props;
        dispatch(setHendelseData(id, data));
    }

    render() {
        const { brodsmuler, ledetekster, hendelser, arbeidssituasjon, tidslinjer, henter, hentingFeilet } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst', ledetekster)}</p>`,
        };
        return (<SideMedHoyrekolonne tittel={getLedetekst('tidslinje.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || !ledetekster || (tidslinjer && tidslinjer.length === 0)) {
                        return (<Feilmelding />);
                    }
                    return (<div>
                        <Sidetopp tittel="Tidslinjen" htmlTekst={htmlIntro} />
                        <TidslinjeVelgArbeidssituasjonContainer arbeidssituasjon={arbeidssituasjon} />
                        <Tidslinje
                            hendelser={hendelser}
                            ledetekster={ledetekster}
                            arbeidssituasjon={arbeidssituasjon}
                            setHendelseData={(id, data) => {
                                this.setHendelseData(id, data);
                            }} />
                    </div>);
                })()
            }
        </SideMedHoyrekolonne>);
    }
}

TidslinjeSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.array,
    ledetekster: PropTypes.object,
    hendelser: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
    hashMilepaeler: PropTypes.array,
    apneHendelser: PropTypes.func,
    hashHendelser: PropTypes.array,
    tidslinjer: PropTypes.array,
    hentingFeilet: PropTypes.bool
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
    const ledetekster = state.ledetekster.data;
    return {
        ledetekster,
        arbeidssituasjon,
        hendelser,
        hashHendelser,
        tidslinjer: state.tidslinjer.data,
        henter: ledetekster.henter || state.tidslinjer.henter,
        hentingFeilet: ledetekster.hentingFeilet || state.tidslinjer.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', ledetekster),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('tidslinje.sidetittel', ledetekster),
        }],
    };
}

const TidslinjeContainer = connect(mapStateToProps)(TidslinjeSide);

export default TidslinjeContainer;
