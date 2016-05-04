import React, { PropTypes } from 'react';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning, SykmeldingNokkelOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';


const MulighetForArbeid = ({sykmelding, ledetekster}) => {
	return (<div>
                <h4 className="sykmelding-seksjonstittel">Mulighet for arbeid</h4>
                {
                    getSykmeldingOpplysning(sykmelding, 'startLegemeldtFravaer', 'Når startet det legemeldte fraværet?', formatDate(sykmelding.startLegemeldtFravaer))
                }
                {
                    sykmelding.aarsakAktivitetIkkeMulig433 ? <SykmeldingOpplysning tittel="Pasienten kan ikke være i arbeid (100 % sykmeldt)">
                        {
                            getSykmeldingCheckbox(sykmelding, "aarsakAktivitetIkkeMulig433", "Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet")
                        }
                        <p className="sykmelding-checkbox sykmelding-subopplysning js-aarsakAktivitetIkkeMulig433hvisJa">
                            <img src="/sykefravaer/img/svg/check-box-1.svg" alt="Avkrysset" />
                            {sykmelding.aarsakAktivitetIkkeMulig433}
                        </p>
                    </SykmeldingOpplysning> : ''
                }
                {
                    getSykmeldingOpplysning(sykmelding, '')
                }
		</div>);
};

export default MulighetForArbeid;
