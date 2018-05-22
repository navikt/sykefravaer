import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as soknaderActions from '../../actions/soknader_actions';
import * as sykepengesoknaderActions from '../../actions/sykepengesoknader_actions';
import Feilmelding from '../../components/Feilmelding';
import FoerDuBegynnerContainer from './FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from './FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from './AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from './OppsummeringContainer';
import SykepengesoknadKvitteringContainer from './SykepengesoknadKvitteringContainer';
import Side from '../../sider/Side';

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
    switch (beregnSteg(sti)) {
        case KVITTERING: {
            return [{
                tittel: 'Ditt sykefravær',
                sti: '/',
                erKlikkbar: true,
            }, {
                tittel: 'Søknader om sykepenger',
                sti: '/soknader/',
                erKlikkbar: true,
            }, {
                tittel: 'Søknad',
                sti: `/soknader/${id}`,
                erKlikkbar: true,
            }, {
                tittel: 'Kvittering',
            }];
        }
        default: {
            return [{
                tittel: 'Ditt sykefravær',
                sti: '/',
                erKlikkbar: true,
            }, {
                tittel: 'Søknader om sykepenger',
                sti: '/soknader/',
                erKlikkbar: true,
            }, {
                tittel: 'Søknad',
            }];
        }
    }
};

const Frilansersoknad = (props) => {
    const steg = beregnSteg(props.sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <p>Test</p>;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

Frilansersoknad.propTypes = {
    sti: PropTypes.string,
};

const Arbeidstakersoknad = (props) => {
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

Arbeidstakersoknad.propTypes = {
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
    }

    render() {
        const { skalHenteSykepengesoknader, skalHenteSoknader, erArbeidstakersoknad, erFrilansersoknad, henter, sti } = this.props;
        const brodsmuler = beregnBrodsmulesti(sti, this.props.soknadId);
        return (<Side brodsmuler={brodsmuler} tittel="Søknad om sykepenger" laster={skalHenteSykepengesoknader || skalHenteSoknader || henter}>
            {(() => {
                if (erArbeidstakersoknad) {
                    return <Arbeidstakersoknad {...this.props} />;
                } else if (erFrilansersoknad) {
                    return <Frilansersoknad {...this.props} />;
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
    }),
    skalHenteSykepengesoknader: PropTypes.bool,
    skalHenteSoknader: PropTypes.bool,
    erArbeidstakersoknad: PropTypes.bool,
    erFrilansersoknad: PropTypes.bool,
    sti: PropTypes.string,
    henter: PropTypes.bool,
    soknadId: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...sykepengesoknaderActions, ...soknaderActions }, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const soknadId = ownProps.params.sykepengesoknadId;
    const erFrilansersoknad = state.soknader.data.some((s) => {
        return s.id === soknadId;
    });
    const erArbeidstakersoknad = state.sykepengesoknader.data.some((s) => {
        return s.id === soknadId;
    });
    const henter = state.soknader.henter || state.sykepengesoknader.henter || state.ledetekster.henter;
    const hentingFeilet = state.soknader.hentingFeilet || state.sykepengesoknader.hentingFeilet || state.ledetekster.hentingFeilet;
    return {
        skalHenteSykepengesoknader: !state.sykepengesoknader.hentet && !state.sykepengesoknader.henter,
        skalHenteSoknader: !state.soknader.hentet && !state.soknader.henter,
        erFrilansersoknad,
        erArbeidstakersoknad,
        henter,
        hentingFeilet,
        sti: ownProps.location.pathname,
        soknadId,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
