/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    sykepengesoknadstatuser,
    sykmeldingstatuser,
} from '../../../digisyfoNpm';
import Side from '../../../sider/Side';
import Sykmeldingkvittering, { kvitteringtyper } from '../../kvittering/Sykmeldingkvittering';
import AppSpinner from '../../../components/AppSpinner';
import Feilmelding from '../../../components/Feilmelding';
import { soknadPt, sykmelding as sykmeldingPt } from '../../../propTypes';
import { hentDineSykmeldinger } from '../../data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentSoknader, oppdaterSoknader } from '../../../data/soknader/soknaderActions';
import { hentBrukerinfo } from '../../../data/brukerinfo/brukerinfo_actions';
import { hentAktuelleArbeidsgivere } from '../../data/arbeidsgivere/arbeidsgivereActions';
import { selectDinSykmelding } from '../../data/dine-sykmeldinger/dineSykmeldingerSelectors';
import { hentApiUrl } from '../../../data/gateway-api';
import { getKvitteringtype } from './getKvitteringstype';
import { harStrengtFortroligAdresseSelector } from '../../../data/brukerinfo/brukerinfoSelectors';

const {
    SENDT,
    TIL_SENDING,
    BEKREFTET,
    AVBRUTT,
} = sykmeldingstatuser;
const { FREMTIDIG } = sykepengesoknadstatuser;

const erAvventende = sykmelding => sykmelding.mulighetForArbeid.perioder.some(periode => periode.avventende);
const erReisetilskudd = sykmelding => sykmelding.mulighetForArbeid.perioder.some(periode => periode.reisetilskudd);

export const testState = {
    erLokalBehandling: false,
};

export class KvitteringSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erBehandlet: undefined,
            aktivBehandletFetching: false,
        };
    }

    componentWillMount() {
        this.startBehandletFetching();
    }

    componentDidMount() {
        const {
            sykmeldingId,
            doHentDineSykmeldinger,
            doHentSoknader,
            doHentBrukerinfo,
            doHentAktuelleArbeidsgivere,
        } = this.props;

        doHentDineSykmeldinger();
        doHentSoknader();
        doHentBrukerinfo();
        doHentAktuelleArbeidsgivere(sykmeldingId);
    }

    componentDidUpdate() {
        this.startBehandletFetching();
    }

    startBehandletFetching() {
        const {
            sykmelding,
            sykmeldingId,
        } = this.props;
        const {
            aktivBehandletFetching,
            erBehandlet,
        } = this.state;
        if (sykmelding && erBehandlet === undefined && !aktivBehandletFetching) {
            const ikkeBehandle = sykmelding && (sykmelding.status === AVBRUTT
                || erAvventende(sykmelding)
                || erReisetilskudd(sykmelding));


            this.setState({
                erBehandlet: ikkeBehandle || testState.erLokalBehandling
                    ? true
                    : this.sykmeldingBehandlet(sykmeldingId),
            });
        }
    }

    sykmeldingBehandlet(sykmeldingId) {
        const startTime = new Date().getTime();

        this.setState({
            aktivBehandletFetching: true,
        });
        const interval = setInterval(() => {
            if ((new Date().getTime() - startTime) > 15000) {
                clearInterval(interval);
                this.setState({
                    aktivBehandletFetching: false,
                });
            }
            fetch(
                `${hentApiUrl()}/sykmeldinger/${sykmeldingId}/actions/behandlet`,
                { credentials: 'include' },
            )
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((data) => {
                                if (data === true) {
                                    clearInterval(interval);
                                    this.setState({
                                        aktivBehandletFetching: false,
                                        erBehandlet: true,
                                    });
                                    const {
                                        doOppdaterSoknader,
                                    } = this.props;

                                    doOppdaterSoknader();
                                } else {
                                    this.setState({ erBehandlet: false });
                                }
                            });
                    }
                });
        }, 1000);
    }

    render() {
        const {
            sykmelding,
            sykmeldingId,
            henter,
            hentingFeilet,
            soknadHentingFeilet,
            soknader,
            arbeidsgivere,
            sykmeldingMeta,
            harStrengtFortroligAdresse,
        } = this.props;

        const {
            erBehandlet,
            aktivBehandletFetching,
        } = this.state;

        const brodsmuler = [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel'),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.sidetittel'),
            sti: `/sykmeldinger/${sykmeldingId}`,
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('din-sykmelding.kvittering.sidetittel'),
        }];


        const fremtidigeSoknader = soknader.filter(s => s.status === FREMTIDIG);
        const kvitteringtype = getKvitteringtype(sykmelding, soknader, arbeidsgivere, sykmeldingMeta, harStrengtFortroligAdresse, soknadHentingFeilet);
        const innhold = (() => {
            if (erBehandlet === undefined || aktivBehandletFetching) {
                return <AppSpinner />;
            }
            if (henter) {
                return <AppSpinner />;
            }
            if (erBehandlet === false) {
                return (
                    <Sykmeldingkvittering
                        fremtidigeSoknader={fremtidigeSoknader}
                        kvitteringtype={kvitteringtyper.KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER}
                    />
                );
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            if (!sykmelding) {
                return (
                    <Feilmelding
                        tittel="Fant ikke kvittering"
                        melding="Vi fant ikke kvitteringen du ser etter. Er du sikker på at du er på riktig side?" />
                );
            }
            if (kvitteringtype && [SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) > -1) {
                return (
                    <Sykmeldingkvittering
                        kvitteringtype={kvitteringtype}
                        fremtidigeSoknader={fremtidigeSoknader} />
                );
            }
            if ([SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) === -1) {
                return (
                    <Feilmelding
                        tittel="Sykmeldingen har feil status"
                        melding={`Du kan ikke se kvitteringen fordi sykmeldingen har status «${sykmelding.status}»`}
                    />
                );
            }
            return <Feilmelding />;
        })();

        return (
            <Side tittel={getLedetekst('din-sykmelding.kvittering.sidetittel')} brodsmuler={brodsmuler}>
                {innhold}
            </Side>
        );
    }
}

KvitteringSide.propTypes = {
    sykmelding: sykmeldingPt,
    sykmeldingId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    soknadHentingFeilet: PropTypes.bool,
    soknader: PropTypes.arrayOf(soknadPt),
    harStrengtFortroligAdresse: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    arbeidsgivere: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    sykmeldingMeta: PropTypes.any,
    doHentDineSykmeldinger: PropTypes.func,
    doHentSoknader: PropTypes.func,
    doHentBrukerinfo: PropTypes.func,
    doHentAktuelleArbeidsgivere: PropTypes.func,
    doOppdaterSoknader: PropTypes.func,
};


export function mapStateToProps(state, ownProps) {
    const { sykmeldingId } = ownProps.params;
    const sykmelding = selectDinSykmelding(state, sykmeldingId);
    const henter = state.dineSykmeldinger.henter
        || state.soknader.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const soknadHentingFeilet = state.soknader.hentingFeilet;
    const soknader = state.soknader.data.filter(s => s.sykmeldingId === sykmeldingId);

    const { arbeidsgivere } = state;
    const { sykmeldingMeta } = state;
    const harStrengtFortroligAdresse = harStrengtFortroligAdresseSelector(state);
    return {
        henter,
        hentingFeilet,
        soknadHentingFeilet,
        sykmeldingId,
        sykmelding,
        soknader,
        arbeidsgivere,
        sykmeldingMeta,
        harStrengtFortroligAdresse,
    };
}

const actionCreators = {
    doHentDineSykmeldinger: hentDineSykmeldinger,
    doHentSoknader: hentSoknader,
    doHentBrukerinfo: hentBrukerinfo,
    doHentAktuelleArbeidsgivere: hentAktuelleArbeidsgivere,
    doOppdaterSoknader: oppdaterSoknader,
};

const SykmeldingkvitteringSide = connect(mapStateToProps, actionCreators)(KvitteringSide);

export default SykmeldingkvitteringSide;
