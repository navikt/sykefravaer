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
        const { sykmelding, visEldreSykmeldingVarsel, eldsteSykmeldingId, registrerInnsending, blaKnapp, onClick } = this.props;
        const className = blaKnapp ? 'knapp knapp--mini' : 'rammeknapp rammeknapp--mini';
        return (<div>
            <div className="panel blokk--s">
                <IllustrertInnhold ikon="/sykefravaer/img/svg/din-sykmelding-veileder.svg" ikonAlt="NAV-veileder">
                    <div>
                        <p>{getLedetekst('din-sykmelding.introtekst.abtest')}</p>
                        <p className="sist introtekst__knapperad">
                            <button className={className} type="button" onClick={(e) => {
                                onClick();
                                e.preventDefault();
                                scrollTo(this.refs.skjema, 300);
                            }}>Gå til utfylling</button>
                        </p>
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
    blaKnapp: PropTypes.bool,
};

const EKSPERIMENTNAVN = 'INTROTEKST_SYKMELDING_KNAPP_FARGE';
const BLAA_KNAPP = 'BLAA_KNAPP';
const HVIT_KNAPP = 'HVIT_KNAPP';

const getDatalayerData = (experiment, variant, harSendtSykmeldingerFoer, resultat) => {
    return {
        /* eslint-disable */
        'event': `EKSPERIMENT_${experiment}`,
        'digisyfoEksperimentnavn': experiment,
        'digisyfoBrukersegment': harSendtSykmeldingerFoer ? 'HAR_BEHANDLET_SYKMELDING_FØR' : 'HAR_IKKE_BEHANDLET_SYKMELDING_FØR',
        'digisyfoABVariant': variant,
        'digisyfoABResultat': resultat,
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
        this.state = {
            harKlikket: false
        };
    }

    registrerVisning(experiment, variant) {
        pushDatalayerData(getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, 'SYKMELDING_VIST_UTEN_KLIKK'));
        this.setState({
            experiment,
            variant,
        });
    }

    registrerInnsending() {
        const { experiment, variant, harKlikket } = this.state;
        let resultat = 'SYKMELDING_BEHANDLET';
        if (harKlikket) {
            resultat = 'KLIKK_OG_SYKMELDING_BEHANDLET';
        }
        const datalayerData = getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, resultat);
        pushDatalayerData(datalayerData);
    }

    registrerKlikk() {
        const { experiment, variant } = this.state;
        this.setState({
            harKlikket: true,
        });
        const datalayerData = getDatalayerData(experiment, variant, this.props.harSendtSykmeldingerFoer, 'KLIKK_UTEN_INNSENDING');
        pushDatalayerData(datalayerData);
    }

    render() {
        return (<div id="din-sykmelding" data-variant={this.state.variant} data-erfaren-bruker={this.props.harSendtSykmeldingerFoer}>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <Experiment onChoice={(experiment, variant) => {
                this.registrerVisning(experiment, variant);
            }} name={EKSPERIMENTNAVN}>
                <Variant name={BLAA_KNAPP}>
                    <Skjema {...this.props} onClick={() => {
                        this.registrerKlikk()
                    }} registrerInnsending={() => {
                        this.registrerInnsending();
                    }} />
                </Variant>
                <Variant name={HVIT_KNAPP}>
                    <Skjema {...this.props} onClick={() => {
                        this.registrerKlikk()
                    }} blaKnapp registrerInnsending={() => {
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
