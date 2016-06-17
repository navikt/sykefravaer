import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getLedetekst } from '../ledetekster/index';
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
                        getLedetekst('din-sykmelding.tilbakedatering.kontakt.dato', ledetekster), toDatePrettyPrint(sykmelding.tilbakedatering.dokumenterbarPasientkontakt))
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
