import React from 'react';
import { tilLesbarDatoMedArstall, getSykmeldingOpplysning } from '../../utils';
import { getLedetekst } from '../../ledetekster';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';

const Tilbakedatering = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.tilbakedatering.dokumenterbarPasientkontakt || sykmelding.tilbakedatering.tilbakedatertBegrunnelse;
    if (!visSeksjon) {
        return <span />;
    }
    return (
        <div className="sykmeldingSeksjon">
            <h4 className="sykmeldingSeksjon__tittel">{getLedetekst('din-sykmelding.tilbakedatering.tittel', ledetekster)}</h4>
            {
                getSykmeldingOpplysning(sykmelding.tilbakedatering, 'dokumenterbarPasientkontakt',
                    getLedetekst('din-sykmelding.tilbakedatering.kontakt.dato', ledetekster), tilLesbarDatoMedArstall(sykmelding.tilbakedatering.dokumenterbarPasientkontakt))
            }
            {
                getSykmeldingOpplysning(sykmelding.tilbakedatering, 'tilbakedatertBegrunnelse', getLedetekst('din-sykmelding.tilbakedatering.begrunnelse', ledetekster))
            }
        </div>
    );
};

Tilbakedatering.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
};

export default Tilbakedatering;
