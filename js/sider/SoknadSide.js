import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as soknaderActions from '../actions/soknader_actions';
import * as sykepengesoknaderActions from '../actions/sykepengesoknader_actions';
import * as dineSykmeldingerActions from '../actions/dineSykmeldinger_actions';
import Feilmelding from '../components/Feilmelding';
import FoerDuBegynnerContainer from '../containers/sykepengesoknad-arbeidstaker/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../containers/sykepengesoknad-arbeidstaker/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../containers/sykepengesoknad-arbeidstaker/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../containers/sykepengesoknad-arbeidstaker/OppsummeringContainer';
import SykepengesoknadKvitteringContainer from '../containers/sykepengesoknad-arbeidstaker/SykepengesoknadKvitteringContainer';
import FoerDuBegynnerSelvstendigContainer from '../containers/sykepengesoknad-selvstendig/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingSelvstendigContainer from '../containers/sykepengesoknad-selvstendig/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenSelvstendigContainer from '../containers/sykepengesoknad-selvstendig/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringSelvstendigContainer from '../containers/sykepengesoknad-selvstendig/OppsummeringContainer';
import KvitteringSelvstendigContainer from '../containers/sykepengesoknad-selvstendig/SykepengesoknadSelvstendigKvitteringContainer';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import { KORRIGERT, NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING, AVBRUTT } from '../enums/soknadstatuser';
import SendtSoknadSelvstendig from '../components/sykepengesoknad-selvstendig/SendtSoknadSelvstendig';
import { soknad as soknadPt } from '../propTypes/index';
import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';
import SykepengesoknadUtlandSkjemaContainer from '../containers/sykepengesoknad-utland/SykepengesoknadUtlandSkjemaContainer';
import { ArbeidstakerSoknadHotjarTrigger, FrilanserSoknadHotjarTrigger, SykepengerUtlandSoknadTrigger } from '../components/HotjarTrigger';
import AvbruttSoknadSelvstendig from '../components/sykepengesoknad-selvstendig/AvbruttSoknadSelvstendig';

const FOER_DU_BEGYNNER = 'FOER_DU_BEGYNNER';
const FRAVAER_OG_FRISKMELDING = 'FRAVAER_OG_FRISKMELDING';
const AKTIVITETER_I_SYKMELDINGSPERIODEN = 'AKTIVITETER_I_SYKMELDINGSPERIODEN';
const OPPSUMMERING = 'OPPSUMMERING';
const KVITTERING = 'KVITTERING';

const beregnSteg = (sti) => {
    if (sti.indexOf('oppsummering') > -1) {
        return OPPSUMMERING;
    }
    if (sti.indexOf('kvittering') > -1) {
        return KVITTERING;
    }
    if (sti.indexOf('fravaer-og-friskmelding') > -1) {
        return FRAVAER_OG_FRISKMELDING;
    }
    if (sti.indexOf('aktiviteter-i-sykmeldingsperioden') > -1) {
        return AKTIVITETER_I_SYKMELDINGSPERIODEN;
    }
    return FOER_DU_BEGYNNER;
};

const beregnBrodsmulesti = (sti, id) => {
    const dittSykefravaerSmule = {
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    };
    const soknaderSmule = {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader/',
        erKlikkbar: true,
    };
    switch (beregnSteg(sti)) {
        case KVITTERING: {
            return [dittSykefravaerSmule, soknaderSmule, {
                tittel: 'Søknad',
                sti: `/soknader/${id}`,
                erKlikkbar: true,
            }, {
                tittel: 'Kvittering',
            }];
        }
        default: {
            return [dittSykefravaerSmule, soknaderSmule, {
                tittel: 'Søknad',
            }];
        }
    }
};

export const SykepengeskjemaForSelvstendige = (props) => {
    switch (beregnSteg(props.sti)) {
        case FOER_DU_BEGYNNER: {
            return <FoerDuBegynnerSelvstendigContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <FravaerOgFriskmeldingSelvstendigContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <AktiviteterISykmeldingsperiodenSelvstendigContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <OppsummeringSelvstendigContainer {...props} />;
        }
        case KVITTERING: {
            return <KvitteringSelvstendigContainer {...props} />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SykepengeskjemaForSelvstendige.propTypes = {
    sti: PropTypes.string,
};

export const SykepengesoknadSelvstendigNaeringsdrivende = (props) => {
    const { soknad, sti } = props;
    switch (soknad.status) {
        case NY:
        case UTKAST_TIL_KORRIGERING: {
            return <SykepengeskjemaForSelvstendige {...props} />;
        }
        case TIL_SENDING:
        case SENDT:
        case KORRIGERT: {
            if (beregnSteg(sti) === KVITTERING) {
                return <KvitteringSelvstendigContainer {...props} />;
            }
            return <SendtSoknadSelvstendig {...props} />;
        }
        case AVBRUTT: {
            return <AvbruttSoknadSelvstendig {...props} />;
        }
        default: {
            return <Feilmelding melding="feil status" />;
        }
    }
};

SykepengesoknadSelvstendigNaeringsdrivende.propTypes = {
    sti: PropTypes.string,
    soknad: soknadPt,
};

const SykepengesoknadArbeidstaker = (props) => {
    const { sti } = props;
    const steg = beregnSteg(sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <FoerDuBegynnerContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <FravaerOgFriskmeldingContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <AktiviteterISykmeldingsperiodenContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <OppsummeringContainer {...props} />;
        }
        case KVITTERING: {
            return <SykepengesoknadKvitteringContainer {...props} />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SykepengesoknadArbeidstaker.propTypes = {
    sti: PropTypes.string,
};

export class Container extends Component {
    componentDidMount() {
        this.props.actions.hentSykepengesoknader();
        this.props.actions.hentSoknader();
        this.props.actions.hentDineSykmeldinger();
    }

    componentDidUpdate() {
        this.props.actions.hentDineSykmeldinger();
    }

    render() {
        const {
            erArbeidstakersoknad,
            erSelvstendigNaeringsdrivendeSoknad,
            erSoknadOmUtenlandsopphold,
            skalHenteSykmeldinger,
            henter,
            sti,
        } = this.props;
        const brodsmuler = beregnBrodsmulesti(sti, this.props.soknadId);
        return (<Side brodsmuler={brodsmuler} tittel="Søknad om sykepenger" laster={skalHenteSykmeldinger || henter}>
            {(() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (erArbeidstakersoknad) {
                    return (<ArbeidstakerSoknadHotjarTrigger>
                        <SykepengesoknadArbeidstaker {...this.props} />
                    </ArbeidstakerSoknadHotjarTrigger>);
                } else if (erSelvstendigNaeringsdrivendeSoknad) {
                    return (<FrilanserSoknadHotjarTrigger>
                        <SykepengesoknadSelvstendigNaeringsdrivende {...this.props} />
                    </FrilanserSoknadHotjarTrigger>);
                } else if (erSoknadOmUtenlandsopphold) {
                    return (<SykepengerUtlandSoknadTrigger>
                        <SykepengesoknadUtlandSkjemaContainer {...this.props} />
                    </SykepengerUtlandSoknadTrigger>);
                }
                return <Feilmelding />;
            })()}
        </Side>);
    }
}

Container.propTypes = {
    actions: PropTypes.shape({
        hentSykepengesoknader: PropTypes.func,
        hentSoknader: PropTypes.func,
        hentDineSykmeldinger: PropTypes.func,
    }),
    skalHenteSykepengesoknader: PropTypes.bool,
    skalHenteSoknader: PropTypes.bool,
    skalHenteSykmeldinger: PropTypes.bool,
    erArbeidstakersoknad: PropTypes.bool,
    erSelvstendigNaeringsdrivendeSoknad: PropTypes.bool,
    erSoknadOmUtenlandsopphold: PropTypes.bool,
    brukerHarNavigertTilAnnenSoknad: PropTypes.bool,
    sti: PropTypes.string,
    henter: PropTypes.bool,
    soknadId: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...sykepengesoknaderActions, ...soknaderActions, ...dineSykmeldingerActions }, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const soknadId = ownProps.params.sykepengesoknadId;
    const finnSoknad = (s) => {
        return s.id === soknadId;
    };
    const soknad = state.soknader.data.find(finnSoknad);
    const sykepengesoknad = state.sykepengesoknader.data.find(finnSoknad);
    const erSelvstendigNaeringsdrivendeSoknad = soknad !== undefined && soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
    const erSoknadOmUtenlandsopphold = soknad !== undefined && soknad.soknadstype === OPPHOLD_UTLAND;
    const erArbeidstakersoknad = sykepengesoknad !== undefined;
    const skalHenteSykmeldinger = !state.dineSykmeldinger.hentet && !state.dineSykmeldinger.henter;
    const henter = state.soknader.henter || state.sykepengesoknader.henter || state.ledetekster.henter || (skalHenteSykmeldinger);
    const hentingFeilet = state.soknader.hentingFeilet || state.sykepengesoknader.hentingFeilet || state.ledetekster.hentingFeilet;

    return {
        soknadId,
        erSelvstendigNaeringsdrivendeSoknad,
        erSoknadOmUtenlandsopphold,
        erArbeidstakersoknad,
        henter,
        hentingFeilet,
        sti: ownProps.location.pathname,
        soknad,
        sykepengesoknad,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
