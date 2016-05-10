import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const Tilbakedatering = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.dokumenterbarPasientkontakt || sykmelding.tilbakedatertBegrunnelse;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
               <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.tilbakedatering.tittel', ledetekster)}</h4>
                {
                    getSykmeldingOpplysning(sykmelding, 'dokumenterbarPasientkontakt', getLedetekst('sykmelding.vis.tilbakedatering.kontakt.dato', ledetekster), formatDate(sykmelding.dokumenterbarPasientkontakt))
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'tilbakedatertBegrunnelse', getLedetekst('sykmelding.vis.tilbakedatering.begrunnelse', ledetekster))
                }
        </div>);
};

Tilbakedatering.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Tilbakedatering;
