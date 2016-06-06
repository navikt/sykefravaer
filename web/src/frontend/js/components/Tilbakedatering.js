import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const Tilbakedatering = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.tilbakedatering.dokumenterbarPasientkontakt || sykmelding.tilbakedatering.tilbakedatertBegrunnelse;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
               <h4 className="sykmelding-seksjonstittel">{getLedetekst('din-sykmelding.tilbakedatering.tittel', ledetekster)}</h4>
                {
                    getSykmeldingOpplysning(sykmelding.tilbakedatering, 'dokumenterbarPasientkontakt',
                        getLedetekst('din-sykmelding.tilbakedatering.kontakt.dato', ledetekster), formatDate(sykmelding.tilbakedatering.dokumenterbarPasientkontakt))
                }
                {
                    getSykmeldingOpplysning(sykmelding.tilbakedatering, 'tilbakedatertBegrunnelse', getLedetekst('din-sykmelding.tilbakedatering.begrunnelse', ledetekster))
                }
        </div>);
};

Tilbakedatering.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Tilbakedatering;
