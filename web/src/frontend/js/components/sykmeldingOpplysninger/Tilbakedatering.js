import React, { PropTypes } from 'react';
import { toDatePrettyPrint, getSykmeldingOpplysning } from '../../utils';
import { getLedetekst } from '../../ledetekster';

const Tilbakedatering = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.tilbakedatering.dokumenterbarPasientkontakt || sykmelding.tilbakedatering.tilbakedatertBegrunnelse;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmeldingSeksjon">
               <h4 className="sykmeldingSeksjon__tittel">{getLedetekst('din-sykmelding.tilbakedatering.tittel', ledetekster)}</h4>
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
