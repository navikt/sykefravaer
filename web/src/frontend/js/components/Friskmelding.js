import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const Friskmelding = ({ sykmelding, ledetekster }) => {
	return (<div>
                <h4 className="sykmelding-seksjonstittel">Friskmelding</h4>
                {
                    getSykmeldingCheckbox(sykmelding, 'antarReturSammeArbeidsgiver', 'Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver')
                }
                {
                    sykmelding.antarReturSammeArbeidsgiver ? getSykmeldingOpplysning(sykmelding, 'antattDatoReturSammeArbeidsgiver', 'Når antar du det kan skje?', formatDate(sykmelding.antattDatoReturSammeArbeidsgiver)) : ''
                }
                {
                    getSykmeldingCheckbox(sykmelding, 'antarReturAnnenArbeidsgiver', 'Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet arbeid hos annen arbeidsgiver')
                }
                {
                    !sykmelding.tilbakemeldingReturArbeid ? '' :
                    <div>
                        {
                            getSykmeldingCheckbox(sykmelding, 'tilbakemeldingReturArbeid', "Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen arbeidsgiver")
                        }
                        <SykmeldingOpplysning className="sykmelding-subopplysning" tittel="Når antar du å kunne gi tilbakemelding på dette?">
                            <p className="js-tilbakemeldingReturArbeidDato">{formatDate(sykmelding.tilbakemeldingReturArbeid)}</p>
                        </SykmeldingOpplysning>
                    </div>
                }
                {
                    !sykmelding.utenArbeidsgiverAntarTilbakeIArbeid ? '' :
                    <div>
                        {
                            getSykmeldingCheckbox(sykmelding, 'utenArbeidsgiverAntarTilbakeIArbeid', "Jeg antar at pasienten på sikt kan komme tilbake i arbeid")
                        }
                        {
                            !sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato ? '' :
                            <SykmeldingOpplysning className="sykmelding-subopplysning" tittel="Når antar du at dette kan skje?">
                                <p className="js-utenArbeidsgiverAntarTilbakeIArbeidDato">{formatDate(sykmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}</p>
                            </SykmeldingOpplysning>
                        }
                    </div>
                }
                {
                    !sykmelding.utenArbeidsgiverTilbakemelding ? '' :
                    <div>
                        {
                            getSykmeldingCheckbox(sykmelding, 'utenArbeidsgiverTilbakemelding', "Jeg er usikker på om pasienten kan komme tilbake i arbeid")
                        }
                        <SykmeldingOpplysning className="sykmelding-subopplysning" tittel="Når antar du å kunne gi tilbakemelding på dette?">
                            <p className="js-utenArbeidsgiverTilbakemeldingDato">{formatDate(sykmelding.utenArbeidsgiverTilbakemelding)}</p>
                        </SykmeldingOpplysning>
                    </div>
                }
		</div>);
};

export default Friskmelding;
