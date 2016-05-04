import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const MeldingTilNAV = ({ sykmelding, ledetekster }) => {
	return (<div>
                {
                    sykmelding.navBoerTaTakISaken ? <h4 className="sykmelding-seksjonstittel">Melding til NAV</h4> : ''
                }
                {
                    getSykmeldingCheckbox(sykmelding, "navBoerTaTakISaken", "NAV bør ta tak i saken nå")
                }
                {
                    !sykmelding.navBoerTaTakISakenBegrunnelse ? '' : 
                    <div className="sykmelding-opplysning sykmelding-subopplysning">
                        <h6>Begrunnelse</h6>
                        <p className="js-navBoerTaTakISakenBegrunnelse">{sykmelding.navBoerTaTakISakenBegrunnelse}</p>
                    </div>
                }
		</div>);
};

export default MeldingTilNAV;
