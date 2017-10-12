import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        const { sykmelding, visEldreSykmeldingVarsel, eldsteSykmeldingId, registrerInnsending, onClick, blaKnapp } = this.props;
        const cn = blaKnapp ? 'knapp knapp--mini' : 'rammeknapp rammeknapp--mini';
        return (<div>
            <div className="panel blokk--s">
                <IllustrertInnhold ikon="/sykefravaer/img/svg/din-sykmelding-veileder.svg" ikonAlt="NAV-veileder">
                    <div>
                        <p>{getLedetekst('din-sykmelding.introtekst.abtest')}</p>
                        <p className="sist introtekst__knapperad">
                            <button className={cn} type="button" onClick={(e) => {
                                onClick();
                                e.preventDefault();
                                scrollTo(this.refs.skjema, 300);
                                this.refs.skjema.focus();
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
                <h2 className="panelHeader__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h2>
            </header>
            <div className="panel blokk">
                <DineSykmeldingOpplysninger sykmelding={sykmelding} />
            </div>
            <div ref="skjema" tabIndex="-1" className="sykmeldingskjemaRef">
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
    treghet: PropTypes.number,
    onClick: PropTypes.func,
    blaKnapp: PropTypes.bool,
};

const EKSPERIMENTNAVN = 'SYKMELDINGSKJEMA_KNAPP_FARGE_2';
const VARIANTER = ['BLÅ', 'GHOST'];

const getDatalayerData = (variant, harSendtSykmeldingerFoer, resultat) => {
    return {
        /* eslint-disable */
        'event': resultat,
        'digisyfoEksperimentnavn': EKSPERIMENTNAVN,
        'digisyfoBrukersegment': harSendtSykmeldingerFoer ? 'HAR_BEHANDLET_SYKMELDING_FØR' : 'HAR_IKKE_BEHANDLET_SYKMELDING_FØR',
        'digisyfoABVariant': variant,
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
        pushDatalayerData(getDatalayerData(variant, this.props.harSendtSykmeldingerFoer, 'SYKMELDING_VIST'));
        this.setState({
            experiment,
            variant,
        });
    }

    registrerInnsending() {
        const { variant } = this.state;
        const datalayerData = getDatalayerData(variant, this.props.harSendtSykmeldingerFoer, 'SYKMELDING_BEHANDLET');
        pushDatalayerData(datalayerData);
    }

    registrerKlikk() {
        const { variant } = this.state;
        const datalayerData = getDatalayerData(variant, this.props.harSendtSykmeldingerFoer, 'SYKMELDING_KLIKK_KNAPP');
        pushDatalayerData(datalayerData);
    }

    render() {
        return (<div id="din-sykmelding" data-variant={this.state.variant} data-erfaren-bruker={this.props.harSendtSykmeldingerFoer}>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
            <Experiment onChoice={(experiment, variant) => {
                this.registrerVisning(experiment, variant);
            }} name={EKSPERIMENTNAVN}>
                {VARIANTER.map((variant, index) => {
                    return (<Variant key={index} name={variant}>
                        <Skjema blaKnapp={variant === 'BLÅ'} {...this.props} onClick={() => {
                            this.registrerKlikk();
                        }} registrerInnsending={() => {
                            this.registrerInnsending();
                        }} />
                    </Variant>);
                })}
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
