import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import { SykmeldingCheckboxSelvstendig } from './SykmeldingCheckbox';

const MeldingTilNAV = ({ sykmelding, ledetekster }) => {
    if (!sykmelding.meldingTilNav.navBoerTaTakISaken) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
        <h4 className="sykmelding-seksjonstittel">{getLedetekst('din-sykmelding.meldingnav.tittel', ledetekster)}</h4>
        <SykmeldingCheckboxSelvstendig tekst={getLedetekst('din-sykmelding.meldingnav.navboertatakisaken.tittel', ledetekster)} jsClassName="navBoerTaTakISaken" />
        {
            !sykmelding.meldingTilNav.navBoerTaTakISakenBegrunnelse ? null :
            <div className="sykmelding-opplysning sykmelding-subopplysning">
                <h6>{getLedetekst('din-sykmelding.meldingnav.navboertatakisaken.begrunnelse.tittel', ledetekster)}</h6>
                <p className="sykmelding-opplysning-verdi js-navBoerTaTakISakenBegrunnelse">{sykmelding.meldingTilNav.navBoerTaTakISakenBegrunnelse}</p>
            </div>
        }
    </div>);
};

MeldingTilNAV.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default MeldingTilNAV;
