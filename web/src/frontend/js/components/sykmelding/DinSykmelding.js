import React, { Component } from 'react';
import { getLedetekst, DineSykmeldingOpplysninger, Varselstripe, scrollTo } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import DinSykmeldingSkjemaContainer from '../../containers/sykmelding/DinSykmeldingSkjemaContainer';
import Sidetopp from '../Sidetopp';
import IllustrertInnhold from '../IllustrertInnhold';
import { sykmelding as sykmeldingPt } from '../../propTypes';

class DinSykmelding extends Component {
    render() {
        const { sykmelding, visEldreSykmeldingVarsel, eldsteSykmeldingId } = this.props;
        return (<div>
            <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
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
            <div className="panel blokk--s">
                <IllustrertInnhold ikon="/sykefravaer/img/svg/din-sykmelding-veileder.svg" ikonAlt="NAV-veileder">
                    <div>
                        <p>{getLedetekst('din-sykmelding.introtekst.abtest')}</p>
                        <p className="sist introtekst__knapperad">
                            <button
                                className="rammeknapp rammeknapp--mini"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(this.skjema);
                                    this.skjema.focus();
                                }}>Gå til utfylling</button>
                        </p>
                    </div>
                </IllustrertInnhold>
            </div>
            <header className="panelHeader panelHeader--lysebla">
                <img className="panelHeader__ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
                <h2 className="panelHeader__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h2>
            </header>
            <div className="panel blokk">
                <DineSykmeldingOpplysninger sykmelding={sykmelding} />
            </div>
            <div
                ref={(c) => {
                    this.skjema = c;
                }}
                tabIndex="-1"
                className="sykmeldingskjemaRef">
                <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
            </div>
        </div>);
    }
}

DinSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
};

export default DinSykmelding;
