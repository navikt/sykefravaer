import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import DinSykmeldingSkjemaContainer from '../../containers/DinSykmeldingSkjemaContainer';
import { getLedetekst, DineSykmeldingOpplysninger, Varselstripe, log } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { Experiment, Variant } from 'react-ab';
import { connect } from 'react-redux';
import { SENDT, BEKREFTET, TIL_SENDING, AVBRUTT } from '../../enums/sykmeldingstatuser';
import IllustrertInnhold from '../IllustrertInnhold';

const Skjema = ({ sykmelding, visEldreSykmeldingVarsel, eldsteSykmeldingId, registrerInnsending }) => {
    return (<div>
        {
            visEldreSykmeldingVarsel && <div className="panel blokk">
                <Varselstripe type="info">
                    <p className="sist">
                        <span>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.tekst')} </span>
                        <Link className="lenke" to={`/sykefravaer/sykmeldinger/${eldsteSykmeldingId}`}>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.lenke')}</Link>
                    </p>
                </Varselstripe>
            </div>
        }
        <header className="panelHeader panelHeader--lysebla">
            <img className="panelHeader__ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img className="panelHeader__ikon panelHeader__ikon--hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" />
            <h2 className="panelHeader__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h2>
        </header>
        <div className="panel blokk">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} />
        </div>
        <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} registrerInnsending={registrerInnsending} />
    </div>);
};

Skjema.propTypes = {
    sykmelding: sykmeldingPt,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
};

const EKSPERIMENTNAVN = 'VISNING_INTROTEKST_DIN_SYKMELDING';
const UTEN_INTROTEKST = 'UTEN_INTROTEKST';
const MED_INTROTEKST = 'MED_INTROTEKST';

const getDatalayerData = (experiment, variant, harSendtSykmeldingerFoer, resultat) => {
    return {
        digisyfoEksperimentnavn: experiment,
        digisyfoBrukersegment: harSendtSykmeldingerFoer ? 'HAR_BEHANDLET_SYKMELDING_FØR' : 'HAR_IKKE_BEHANDLET_SYKMELDING_FØR',
        digisyfoABVariant: variant,
        digisyfoABResultat: resultat,
    };
}

const pushDatalayerData = (data) => {
    window.dataLayer.push(data);
    log(data);
}

class DinSykmelding extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    registrerVisning(experiment, variant) {
        pushDatalayerData(getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, 'SYKMELDING_VIST'));
        this.setState({
            experiment,
            variant,
        });
    }

    registrerInnsending() {
        const { experiment, variant } = this.state;
        const datalayerData = getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, 'SYKMELDING_BEHANDLET');
        pushDatalayerData(datalayerData);
    }

    render() {
        return (<div id="din-sykmelding" data-variant={this.state.variant} data-erfaren-bruker={this.props.harSendtSykmeldingerFoer}>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <Experiment onChoice={(experiment, variant) => {
                this.registrerVisning(experiment, variant);
            }} name={EKSPERIMENTNAVN}>
                <Variant name={UTEN_INTROTEKST}>
                    <Skjema {...this.props} registrerInnsending={() => {
                        this.registrerInnsending();
                    }} />
                </Variant>
                <Variant name={MED_INTROTEKST}>
                    <div className="panel blokk--s">
                        <IllustrertInnhold ikon="/sykefravaer/img/svg/sykmelding-illustrasjon.svg" ikonAlt="Sykmelding">
                            <p className="sist">{getLedetekst('din-sykmelding.introtekst.abtest')}</p>
                        </IllustrertInnhold>
                    </div>
                    <Skjema {...this.props} registrerInnsending={() => {
                        this.registrerInnsending();
                    }} />
                </Variant>
            </Experiment>
        </div>);
    }
}

DinSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    harSendtSykmeldingerFoer: PropTypes.bool,
};


const mapStateToProps = (state) => {
    const harSendtSykmeldingerFoer = state.dineSykmeldinger.data.filter((s) => {
        return [SENDT, BEKREFTET, TIL_SENDING, AVBRUTT].indexOf(s.status) > -1;
    }).length > 0;
    return {
        harSendtSykmeldingerFoer,
    };
};

const DinSykmeldingConnected = connect(mapStateToProps)(DinSykmelding);

export default DinSykmeldingConnected;
