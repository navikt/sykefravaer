import React, { PropTypes } from 'react';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { SykmeldingCheckbox } from './SykmeldingCheckbox.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const fjernAnnet = (array) => {
    if(array.length === 1 && array.indexOf("Annet") > -1) {
        return []
    } else {
        return array; 
    }
}

const Aarsaker = ({ aarsaker, containerClassName }) => { 
    return (<div className={containerClassName}>
        {
            fjernAnnet(aarsaker).map((aarsak, key) => {
                return (<SykmeldingCheckbox tekst={aarsak} key={key} className="sykmelding-subopplysning" />)
            })
        }
    </div>);
};

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
                    (sykmelding.aktivitetIkkeMulig433 && sykmelding.aktivitetIkkeMulig433.length) > 0 ? 
                        <SykmeldingOpplysning tittel="Pasienten kan ikke være i arbeid (100 % sykmeldt)">
                        {
                            getSykmeldingCheckbox(sykmelding, "aktivitetIkkeMulig433", "Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet")
                        }
                        <Aarsaker aarsaker={sykmelding.aktivitetIkkeMulig433} containerClassName="js-aktivitetIkkeMulig433hvisJa" />
                    </SykmeldingOpplysning> : null
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig433', 'Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig')
                }
                {
                    (sykmelding.aktivitetIkkeMulig434 && sykmelding.aktivitetIkkeMulig434.length > 0) ? 
                    <SykmeldingOpplysning tittel="Pasienten kan ikke være i arbeid (100 % sykmeldt)">
                        {
                            getSykmeldingCheckbox(sykmelding, "aktivitetIkkeMulig434", "Det er forhold på arbeidsplassen som hindrer arbeidsrelatert aktivitet")
                        }
                        <Aarsaker aarsaker={sykmelding.aktivitetIkkeMulig434} containerClassName="js-aktivitetIkkeMulig434hvisJa" />
                    </SykmeldingOpplysning> : null
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig434', 'Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig')
                }                
		</div>);
};

export default MulighetForArbeid;
