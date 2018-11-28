import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getLedetekst,
    tilLesbarDatoMedArstall,
    senesteTom,
    sykepengesoknadstatuser,
    sykmeldingstatuser,
    arbeidssituasjoner,
    sykepengesoknad as sykepengesoknadPt,
} from 'digisyfo-npm';
import Side from './Side';
import Sykmeldingkvittering, { kvitteringtyper } from '../components/sykmeldingkvittering/Sykmeldingkvittering';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { soknad as soknadPt, sykmelding as sykmeldingPt } from '../propTypes';
import { SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';
import { harStrengtFortroligAdresseSelector } from '../selectors/brukerinfoSelectors';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentSykepengesoknader } from '../actions/sykepengesoknader_actions';
import { hentSoknader } from '../actions/soknader_actions';
import { hentBrukerinfo } from '../actions/brukerinfo_actions';
import { hentAktuelleArbeidsgivere } from '../actions/dineArbeidsgivere_actions';
import { finnDinSykmeldingSelector } from '../selectors/dineSykmeldingerSelectors';

const { SENDT, TIL_SENDING, BEKREFTET, AVBRUTT } = sykmeldingstatuser;
const { FREMTIDIG, NY } = sykepengesoknadstatuser;

export class KvitteringSide extends Component {
    componentDidMount() {
        this.props.actions.hentSoknader();
        this.props.actions.hentDineSykmeldinger();
        this.props.actions.hentBrukerinfo();
        this.props.actions.hentSykepengesoknader();
        this.props.actions.hentAktuelleArbeidsgivere(this.props.sykmeldingId);
    }

    render() {
        const {
            sykmelding,
            sykmeldingId,
            henter,
            hentingFeilet,
            kvitteringtype,
            sykepengesoknader,
            soknader,
        } = this.props;
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

        const innhold = (() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            if (!sykmelding) {
                return (<Feilmelding
                    tittel="Fant ikke kvittering"
                    melding="Vi fant ikke kvitteringen du ser etter. Er du sikker på at du er på riktig side?" />);
            }
            if (kvitteringtype && [SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) > -1) {
                return (<Sykmeldingkvittering
                    kvitteringtype={kvitteringtype}
                    sykepengesoknader={sykepengesoknader}
                    soknader={soknader} />);
            }
            if ([SENDT, TIL_SENDING, BEKREFTET, AVBRUTT].indexOf(sykmelding.status) === -1) {
                return (<Feilmelding
                    tittel="Sykmeldingen har feil status"
                    melding={`Du kan ikke se kvitteringen fordi sykmeldingen har status «${sykmelding.status}»`}
                />);
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
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
    kvitteringtype: PropTypes.oneOf(Object.values(kvitteringtyper)),
    actions: PropTypes.shape({
        hentSoknader: PropTypes.func,
        hentSykepengesoknader: PropTypes.func,
        hentBrukerinfo: PropTypes.func,
        hentDineSykmeldinger: PropTypes.func,
        hentAktuelleArbeidsgivere: PropTypes.func,
    }),
};

const getArbeidssituasjon = (sykmelding) => {
    return typeof sykmelding.valgtArbeidssituasjon === 'string'
        ? sykmelding.valgtArbeidssituasjon.toUpperCase()
        : '';
};

const erFrilanserEllerSelvstendigNaringsdrivende = (sykmelding) => {
    return [arbeidssituasjoner.FRILANSER, arbeidssituasjoner.NAERINGSDRIVENDE].indexOf(getArbeidssituasjon(sykmelding)) > -1;
};

const erAvventendeReisetilskuddEllerBehandlingsdager = (sykmelding) => {
    return sykmelding
        && sykmelding.mulighetForArbeid
        && sykmelding.mulighetForArbeid.perioder
            .some((periode) => {
                return periode.avventende || periode.reisetilskudd || periode.behandlingsdager;
            });
};

const getKvitteringtype = (state, sykmeldingId) => {
    const sykmelding = state.dineSykmeldinger.data.find((s) => {
        return s.id === sykmeldingId;
    });
    if (!sykmelding) {
        return null;
    }
    const denneSykmeldingensSykepengesoknader = state.sykepengesoknader.data.filter((s) => {
        return s.sykmeldingId === sykmeldingId;
    });
    const nyeSykepengesoknaderForDenneSykmeldingen = denneSykmeldingensSykepengesoknader.filter((s) => {
        return s.status === NY;
    });
    const fremtidigeSykepengesoknaderForDenneSykmeldingen = denneSykmeldingensSykepengesoknader.filter((s) => {
        return s.status === FREMTIDIG;
    });
    const denneSykmeldingensSoknader = state.soknader.data.filter((s) => {
        return s.sykmeldingId === sykmelding.id && s.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
    });
    const nyeSoknaderForDenneSykmeldingen = denneSykmeldingensSoknader.filter((s) => {
        return s.status === NY;
    });
    const skalOppretteSoknad = (state.sykmeldingMeta[sykmeldingId] || {}).skalOppretteSoknad;
    const mottakendeArbeidsgiver = sykmelding.mottakendeArbeidsgiver
        ? state.arbeidsgivere.data.find((arbeidsgiver) => {
            return arbeidsgiver.orgnummer === sykmelding.mottakendeArbeidsgiver.virksomhetsnummer;
        })
        : null;
    const forskuttererArbeidsgiver = mottakendeArbeidsgiver
        && mottakendeArbeidsgiver.naermesteLeder
        ? mottakendeArbeidsgiver.naermesteLeder.arbeidsgiverForskuttererLoenn !== false
        : true;

    switch (sykmelding.status) {
        case AVBRUTT: {
            return kvitteringtyper.AVBRUTT_SYKMELDING;
        }
        case SENDT:
        case TIL_SENDING: {
            return (() => {
                if (denneSykmeldingensSykepengesoknader.length === 0) {
                    return kvitteringtyper.SENDT_SYKMELDING_INGEN_SOKNAD;
                }
                if (nyeSykepengesoknaderForDenneSykmeldingen.length === 0
                    && fremtidigeSykepengesoknaderForDenneSykmeldingen.length === 1) {
                    return forskuttererArbeidsgiver
                        ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_KORT_SYKMELDING
                        : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_KORT_SYKMELDING;
                }
                if (nyeSykepengesoknaderForDenneSykmeldingen.length === 0
                    && fremtidigeSykepengesoknaderForDenneSykmeldingen.length > 1) {
                    return forskuttererArbeidsgiver
                        ? kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_LANG_SYKMELDING
                        : kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_ARBEIDSGIVER_FORSKUTTERER_IKKE_LANG_SYKMELDING;
                }
                return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA;
            })();
        }
        case BEKREFTET: {
            if (harStrengtFortroligAdresseSelector(state) && !erFrilanserEllerSelvstendigNaringsdrivende(sykmelding)) {
                return kvitteringtyper.STRENGT_FORTROLIG_ADRESSE;
            }
            if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSTAKER) {
                return kvitteringtyper.BEKREFTET_SYKMELDING_ARBEIDSTAKER_UTEN_OPPGITT_ARBEIDSGIVER;
            }
            if (getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ANNET || getArbeidssituasjon(sykmelding) === arbeidssituasjoner.ARBEIDSLEDIG) {
                return kvitteringtyper.BEKREFTET_SYKMELDING_ANNET_ARBEIDSLEDIG;
            }
            if (erFrilanserEllerSelvstendigNaringsdrivende(sykmelding) && !erAvventendeReisetilskuddEllerBehandlingsdager(sykmelding)) {
                if (state.soknader.hentingFeilet) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_FEIL_FRILANSER;
                }
                if (nyeSoknaderForDenneSykmeldingen.length > 0) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_NA_FRILANSER;
                }
                if (denneSykmeldingensSoknader.length > 0) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_SOK_SENERE_FRILANSER;
                }
                if (denneSykmeldingensSoknader.length === 0 && !skalOppretteSoknad) {
                    return kvitteringtyper.KVITTERING_UTEN_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE;
                }
                if (skalOppretteSoknad) {
                    return kvitteringtyper.KVITTERING_MED_SYKEPENGER_FRILANSER_NAERINGSDRIVENDE_PAPIR;
                }
            }
            return kvitteringtyper.BEKREFTET_SYKMELDING_UTEN_ARBEIDSGIVER;
        }
        default: {
            return null;
        }
    }
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = finnDinSykmeldingSelector(state, sykmeldingId);
    const henter = state.dineSykmeldinger.henter || state.ledetekster.henter || state.sykepengesoknader.henter || state.soknader.henter;
    const hentingFeilet = state.dineSykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const kvitteringtype = getKvitteringtype(state, sykmeldingId);
    const soknadErFremtidig = (s) => {
        return s.sykmeldingId === sykmeldingId && s.status === FREMTIDIG;
    };

    return {
        henter,
        hentingFeilet,
        sykmeldingId,
        sykmelding,
        sykepengesoknader: state.sykepengesoknader.data.filter(soknadErFremtidig),
        soknader: state.soknader.data.filter(soknadErFremtidig),
        kvitteringtype,
        tom: sykmelding ? tilLesbarDatoMedArstall(senesteTom(sykmelding.mulighetForArbeid.perioder)) : null,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            hentDineSykmeldinger,
            hentSykepengesoknader,
            hentSoknader,
            hentBrukerinfo,
            hentAktuelleArbeidsgivere,
        }, dispatch),
    };
}

const SykmeldingkvitteringSide = connect(mapStateToProps, mapDispatchToProps)(KvitteringSide);

export default SykmeldingkvitteringSide;
