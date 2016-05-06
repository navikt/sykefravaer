import React, { PropTypes } from 'react';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const MulighetForArbeid = ({sykmelding, ledetekster}) => {
    const visSeksjon = (sykmelding.startLegemeldtFravaer || 
    (sykmelding.aktivitetIkkeMulig433 && sykmelding.aktivitetIkkeMulig433.length) || 
    sykmelding.aarsakAktivitetIkkeMulig433 || 
    (sykmelding.aktivitetIkkeMulig434 && sykmelding.aktivitetIkkeMulig434.length) || 
    sykmelding.aarsakAktivitetIkkeMulig434);
    if(!visSeksjon) {
        return <span />; 
    }
	return (<div className="sykmelding-seksjon">
                <h4 className="sykmelding-seksjonstittel">Mulighet for arbeid</h4>
                {
                    getSykmeldingOpplysning(sykmelding, 'startLegemeldtFravaer', 'Når startet det legemeldte fraværet?', formatDate(sykmelding.startLegemeldtFravaer))
                }
                {
                    (sykmelding.aktivitetIkkeMulig433 && sykmelding.aktivitetIkkeMulig433.length) > 0 ? <SykmeldingOpplysning tittel="Pasienten kan ikke være i arbeid (100 % sykmeldt)">
                        {
                            getSykmeldingCheckbox(sykmelding, "aktivitetIkkeMulig433", "Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet")
                        }
                        <div className="js-aktivitetIkkeMulig433hvisJa">
                        {
                            sykmelding.aktivitetIkkeMulig433.map((aarsak, key) => {
                                return <p key={key} className="sykmelding-checkbox sykmelding-subopplysning">
                                    <img src="/sykefravaer/img/svg/check-box-1.svg" alt="Avkrysset" />
                                    {aarsak}
                                </p>
                            })
                        }
                        </div>
                    </SykmeldingOpplysning> : ''
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig433', 'Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig')
                }
                {
                    (sykmelding.aktivitetIkkeMulig434 && sykmelding.aktivitetIkkeMulig434.length > 0) ? <SykmeldingOpplysning tittel="Pasienten kan ikke være i arbeid (100 % sykmeldt)">
                        {
                            getSykmeldingCheckbox(sykmelding, "aktivitetIkkeMulig434", "Det er forhold på arbeidsplassen som hindrer arbeidsrelatert aktivitet")
                        }
                        <div className="js-aktivitetIkkeMulig434hvisJa">
                        {
                            sykmelding.aktivitetIkkeMulig434.map((aarsak, key) => {
                                return <p key={key} className="sykmelding-checkbox sykmelding-subopplysning">
                                    <img src="/sykefravaer/img/svg/check-box-1.svg" alt="Avkrysset" />
                                    {aarsak}
                                </p>
                            })
                        }
                        </div>
                    </SykmeldingOpplysning> : ''
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig434', 'Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig')
                }                
		</div>);
};

export default MulighetForArbeid;
