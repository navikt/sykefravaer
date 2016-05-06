import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const Tilbakedatering = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.dokumenterbarPasientkontakt || sykmelding.tilbakedatertBegrunnelse;
    if(!visSeksjon) {
        return <span />
    }
	return (<div className="sykmelding-seksjon">
               <h4 className="sykmelding-seksjonstittel">Tilbakedatering</h4>
                {
                    getSykmeldingOpplysning(sykmelding, "dokumenterbarPasientkontakt", "Oppgi dato for dokumenterbar kontakt med pasienten", formatDate(sykmelding.dokumenterbarPasientkontakt))
                }
                {
                    getSykmeldingOpplysning(sykmelding, "tilbakedatertBegrunnelse", "Begrunnelse for tilbakedatering")
                }
		</div>);
};

export default Tilbakedatering;
