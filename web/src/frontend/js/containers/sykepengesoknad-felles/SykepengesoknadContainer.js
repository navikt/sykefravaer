import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { destroy } from 'redux-form';
import { bindActionCreators } from 'redux';
import * as soknaderActions from '../../actions/soknader_actions';
import * as sykepengesoknaderActions from '../../actions/sykepengesoknader_actions';
import * as dineSykmeldingerActions from '../../actions/dineSykmeldinger_actions';
import Feilmelding from '../../components/Feilmelding';
import FoerDuBegynnerContainer from '../sykepengesoknad-arbeidstaker/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../sykepengesoknad-arbeidstaker/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../sykepengesoknad-arbeidstaker/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../sykepengesoknad-arbeidstaker/OppsummeringContainer';
import SykepengesoknadKvitteringContainer from '../sykepengesoknad-arbeidstaker/SykepengesoknadKvitteringContainer';
import FoerDuBegynnerSelvstendigContainer from '../sykepengersoknad-selvstendig/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingSelvstendigContainer from '../sykepengersoknad-selvstendig/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenSelvstendigContainer from '../sykepengersoknad-selvstendig/AktiviteterISykmeldingsperiodenContainer';
import Side from '../../sider/Side';
import { beregnHarBrukerNavigertTilAnnenSoknad, SYKEPENGER_SKJEMANAVN } from '../../utils/sykepengesoknadUtils';
import AppSpinner from '../../components/AppSpinner';

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

const SykepengesoknadSelvstendigNaeringsdrivende = (props) => {
    const steg = beregnSteg(props.sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <FoerDuBegynnerSelvstendigContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <FravaerOgFriskmeldingSelvstendigContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <AktiviteterISykmeldingsperiodenSelvstendigContainer {...props} />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SykepengesoknadSelvstendigNaeringsdrivende.propTypes = {
    sti: PropTypes.string,
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
        if (this.props.skalHenteSykepengesoknader) {
            this.props.actions.hentSykepengesoknader();
        }
        if (this.props.skalHenteSoknader) {
            this.props.actions.hentSoknader();
        }
        if (this.props.brukerHarNavigertTilAnnenSoknad) {
            this.props.actions.destroy(SYKEPENGER_SKJEMANAVN);
        }
        if (this.props.skalHenteSykmeldinger) {
            this.props.actions.hentDineSykmeldinger();
        }
    }

    componentDidUpdate() {
        if (this.props.skalHenteSykmeldinger) {
            this.props.actions.hentDineSykmeldinger();
        }
    }

    render() {
        const { skalHenteSykepengesoknader, skalHenteSoknader, erArbeidstakersoknad, erSelvstendigNaeringsdrivendeSoknad, skalHenteSykmeldinger, henter, sti } = this.props;
        const brodsmuler = beregnBrodsmulesti(sti, this.props.soknadId);
        return (<Side brodsmuler={brodsmuler} tittel="Søknad om sykepenger" laster={skalHenteSykepengesoknader || skalHenteSoknader || skalHenteSykmeldinger || henter}>
            {(() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (erArbeidstakersoknad) {
                    return <SykepengesoknadArbeidstaker {...this.props} />;
                } else if (erSelvstendigNaeringsdrivendeSoknad) {
                    return <SykepengesoknadSelvstendigNaeringsdrivende {...this.props} />;
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
        destroy: PropTypes.func,
    }),
    skalHenteSykepengesoknader: PropTypes.bool,
    skalHenteSoknader: PropTypes.bool,
    skalHenteSykmeldinger: PropTypes.bool,
    erArbeidstakersoknad: PropTypes.bool,
    erSelvstendigNaeringsdrivendeSoknad: PropTypes.bool,
    brukerHarNavigertTilAnnenSoknad: PropTypes.bool,
    sti: PropTypes.string,
    henter: PropTypes.bool,
    soknadId: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...sykepengesoknaderActions, ...soknaderActions, ...dineSykmeldingerActions, destroy }, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const soknadId = ownProps.params.sykepengesoknadId;
    const erSelvstendigNaeringsdrivendeSoknad = state.soknader.data.some((s) => {
        return s.id === soknadId;
    });
    const erArbeidstakersoknad = state.sykepengesoknader.data.some((s) => {
        return s.id === soknadId;
    });
    const skalHenteSykmeldinger = erSelvstendigNaeringsdrivendeSoknad && !state.dineSykmeldinger.hentet && !state.dineSykmeldinger.henter;
    const henter = state.soknader.henter || state.sykepengesoknader.henter || state.ledetekster.henter || (skalHenteSykmeldinger);
    const hentingFeilet = state.soknader.hentingFeilet || state.sykepengesoknader.hentingFeilet || state.ledetekster.hentingFeilet;
    const brukerHarNavigertTilAnnenSoknad = beregnHarBrukerNavigertTilAnnenSoknad(state, soknadId);
    
    return {
        soknadId,
        skalHenteSykepengesoknader: !state.sykepengesoknader.hentet && !state.sykepengesoknader.henter,
        skalHenteSoknader: !state.soknader.hentet && !state.soknader.henter,
        skalHenteSykmeldinger,
        erSelvstendigNaeringsdrivendeSoknad,
        erArbeidstakersoknad,
        henter,
        hentingFeilet,
        sti: ownProps.location.pathname,
        brukerHarNavigertTilAnnenSoknad,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
