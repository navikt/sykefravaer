import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';
import { SykmeldingCheckbox, SykmeldingCheckboxSelvstendig } from '../components/SykmeldingCheckbox.js';

const Friskmelding = ({ sykmelding, ledetekster }) => {

    const visSeksjon = (sykmelding.antarReturSammeArbeidsgiver || 
        sykmelding.antattDatoReturSammeArbeidsgiver || 
        sykmelding.antarReturAnnenArbeidsgiver || 
        sykmelding.tilbakemeldingReturArbeid || 
        sykmelding.utenArbeidsgiverTilbakemelding || 
        sykmelding.utenArbeidsgiverAntarTilbakeIArbeid || 
        sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato || 
        sykmelding.utenArbeidsgiverTilbakemelding);

    if(!visSeksjon) {
        return <div></div>; 
    }
    return (<div className="sykmelding-seksjon">
        <h4 className="sykmelding-seksjonstittel">Friskmelding</h4>
        {
            getSykmeldingCheckbox(sykmelding, 'antarReturSammeArbeidsgiver', 'Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver', 'typo-element')
        }
        {
            !sykmelding.antattDatoReturSammeArbeidsgiver ? null : 
            <SykmeldingOpplysning Overskrift="h5" tittel="Når antar du at det kan skje?" className="sykmelding-subopplysning">
                <p className="sykmelding-opplysning-verdi js-antattDatoReturSammeArbeidsgiver">{formatDate(sykmelding.antattDatoReturSammeArbeidsgiver)}</p>
            </SykmeldingOpplysning>   
        }
        {
            getSykmeldingCheckbox(sykmelding, 'antarReturAnnenArbeidsgiver', 'Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos annen arbeidsgiver', 'typo-element')
        }
        {
            getSykmeldingCheckbox(sykmelding, 'tilbakemeldingReturArbeid', 'Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen arbeidsgiver', 'typo-element')
        }
        {
        !sykmelding.tilbakemeldingReturArbeid ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel="Når antar du å kunne gi tilbakemelding på dette?">
                <p className="sykmelding-opplysning-verdi js-tilbakemeldingReturArbeidDato">{formatDate(sykmelding.tilbakemeldingReturArbeid)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding, 'utenArbeidsgiverAntarTilbakeIArbeid', 'Jeg antar at pasienten på sikt kan komme tilbake i arbeid', 'typo-element')
        }
        {
            !(sykmelding.utenArbeidsgiverAntarTilbakeIArbeid && sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato) ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel="Når antar du at dette kan skje?">
                <p className="sykmelding-opplysning-verdi js-utenArbeidsgiverAntarTilbakeIArbeidDato">{formatDate(sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}</p>
            </SykmeldingOpplysning>
        }
        {
            getSykmeldingCheckbox(sykmelding, 'utenArbeidsgiverTilbakemelding', 'Jeg er usikker på om pasienten kan komme tilbake i arbeid', 'typo-element')
        }
        {
            !sykmelding.utenArbeidsgiverTilbakemelding ? null :
            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel="Når antar du å kunne gi tilbakemelding på dette?">
                <p className="js-utenArbeidsgiverTilbakemeldingDato">{formatDate(sykmelding.utenArbeidsgiverTilbakemelding)}</p>
            </SykmeldingOpplysning>
        }
    </div>);
};

export default Friskmelding;
