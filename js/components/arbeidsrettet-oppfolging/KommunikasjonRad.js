import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { getLedetekst } from 'digisyfo-npm';
import React from 'react';

const KommunikasjonRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--hvit">
            <div className="begrensning infoside-fo__info-bokser">
                <div className="infoside-fo__info-boks">
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/infoside-fo/kontakt-arbeidsgiver.svg`} alt="" className="info-boks__illustrasjon" />
                    <Undertittel className="blokk-s">{getLedetekst('infoside-fo.kontakt.overskrift')}</Undertittel>
                    <Normaltekst>{getLedetekst('infoside-fo.kontakt.tekst')}</Normaltekst>
                </div>
                <div className="infoside-fo__info-boks">
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/infoside-fo/mer-veiledning.svg`} alt="" className="info-boks__illustrasjon" />
                    <Undertittel className="blokk-s">{getLedetekst('infoside-fo.aktivitetsplan.overskrift')}</Undertittel>
                    <Normaltekst>{getLedetekst('infoside-fo.aktivitetsplan.tekst')}</Normaltekst>
                </div>
            </div>
        </div>
    );
};

export default KommunikasjonRad;
