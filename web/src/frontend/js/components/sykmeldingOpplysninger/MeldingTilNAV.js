import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import { SykmeldingCheckboxSelvstendig } from './SykmeldingCheckbox';

const MeldingTilNAV = ({ sykmelding, ledetekster }) => {
    if (!sykmelding.meldingTilNav.navBoerTaTakISaken) {
        return <span />;
    }
    return (<div className="sykmeldingSeksjon">
        <h4 className="sykmeldingSeksjon__tittel">{getLedetekst('din-sykmelding.meldingnav.tittel', ledetekster)}</h4>
        <SykmeldingCheckboxSelvstendig tekst={getLedetekst('din-sykmelding.meldingnav.navboertatakisaken.tittel', ledetekster)} jsClassName="navBoerTaTakISaken" />
        {
            !sykmelding.meldingTilNav.navBoerTaTakISakenBegrunnelse ? null :
            <div className="opplysning subopplysning">
                <h6>{getLedetekst('din-sykmelding.meldingnav.navboertatakisaken.begrunnelse.tittel', ledetekster)}</h6>
                <p className="opplysning__verdi js-navBoerTaTakISakenBegrunnelse">{sykmelding.meldingTilNav.navBoerTaTakISakenBegrunnelse}</p>
            </div>
        }
    </div>);
};

MeldingTilNAV.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default MeldingTilNAV;
