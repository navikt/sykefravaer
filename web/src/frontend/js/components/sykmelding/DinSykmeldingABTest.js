import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import DinSykmeldingSkjemaContainer from '../../containers/DinSykmeldingSkjemaContainer';
import { getLedetekst, DineSykmeldingOpplysninger, Varselstripe, log, scrollTo } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { Experiment, Variant } from 'react-ab';
import { connect } from 'react-redux';
import { SENDT, BEKREFTET, TIL_SENDING, AVBRUTT } from '../../enums/sykmeldingstatuser';
import IllustrertInnhold from '../IllustrertInnhold';

class Skjema extends Component {
    render() {
        const { sykmelding, visEldreSykmeldingVarsel, eldsteSykmeldingId, registrerInnsending, visKnapp } = this.props;
        return (<div>
            <div className="panel blokk--s">
                <IllustrertInnhold ikon="/sykefravaer/img/svg/din-sykmelding-veileder.svg" ikonAlt="NAV-veileder">
                    <div>
                    { !visKnapp ? <p className="sist">{getLedetekst('din-sykmelding.introtekst.abtest')}</p> : null }
                    { visKnapp && (<div>
                            <p>{getLedetekst('din-sykmelding.introtekst.abtest')}</p>
                            <p className="sist introtekst__knapperad">
                                <button className="rammeknapp rammeknapp--mini" type="button" onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(this.refs.skjema, 300);
                                }}>Gå til utfylling</button>
                            </p>
                        </div>)}
                    </div>
                </IllustrertInnhold>
            </div>
            {
                visEldreSykmeldingVarsel && <div className="panel blokk--s">
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
            <div ref="skjema">
                <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} registrerInnsending={registrerInnsending} />
            </div>
        </div>);
    }
}

Skjema.propTypes = {
    sykmelding: sykmeldingPt,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    registrerInnsending: PropTypes.func,
    visKnapp: PropTypes.bool,
};

const EKSPERIMENTNAVN = 'INTROTEKST_SYKMELDING_KNAPP';
const UTEN_KNAPP = 'UTEN_KNAPP';
const MED_KNAPP = 'MED_KNAPP';

const getDatalayerData = (experiment, variant, harSendtSykmeldingerFoer, antallSykmeldinger, resultat) => {
    return {
        /* eslint-disable */
        'event': `EKSPERIMENT_${experiment}`,
        'digisyfoEksperimentnavn': experiment,
        'digisyfoBrukersegment': harSendtSykmeldingerFoer ? 'HAR_BEHANDLET_SYKMELDING_FØR' : 'HAR_IKKE_BEHANDLET_SYKMELDING_FØR',
        'digisyfoABVariant': variant,
        'digisyfoABResultat': resultat,
        'digisyfoAntallSendteSykmeldinger': antallSykmeldinger,
        /* eslint-enable */

    };
};

const pushDatalayerData = (data) => {
    window.dataLayer.push(data);
    log(data);
};

class DinSykmelding extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    registrerVisning(experiment, variant) {
        pushDatalayerData(getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, this.props.antallSykmeldinger, 'SYKMELDING_VIST'));
        this.setState({
            experiment,
            variant,
        });
    }

    registrerInnsending() {
        const { experiment, variant } = this.state;
        const datalayerData = getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, this.props.antallSykmeldinger, 'SYKMELDING_BEHANDLET');
        pushDatalayerData(datalayerData);
    }

    render() {
        return (<div id="din-sykmelding" data-variant={this.state.variant} data-erfaren-bruker={this.props.harSendtSykmeldingerFoer}>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <Experiment onChoice={(experiment, variant) => {
                this.registrerVisning(experiment, variant);
            }} name={EKSPERIMENTNAVN}>
                <Variant name={UTEN_KNAPP}>
                    <Skjema {...this.props} registrerInnsending={() => {
                        this.registrerInnsending();
                    }} />
                </Variant>
                <Variant name={MED_KNAPP}>
                    <Skjema {...this.props} visKnapp registrerInnsending={() => {
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
    antallSykmeldinger: PropTypes.number,
};


const mapStateToProps = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        return [SENDT, BEKREFTET, TIL_SENDING, AVBRUTT].indexOf(s.status) > -1;
    });
    const harSendtSykmeldingerFoer = sykmeldinger.length > 0;
    return {
        antallSykmeldinger: sykmeldinger.length,
        harSendtSykmeldingerFoer,
    };
};

const DinSykmeldingConnected = connect(mapStateToProps)(DinSykmelding);

export default DinSykmeldingConnected;
