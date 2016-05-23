import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { SykmeldingCheckboxSelvstendig } from './SykmeldingCheckbox.js';

const MeldingTilNAV = ({ sykmelding, ledetekster }) => {
    if (!sykmelding.navBoerTaTakISaken) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
        <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.meldingnav.tittel', ledetekster)}</h4>
        <SykmeldingCheckboxSelvstendig tekst={getLedetekst('sykmelding.vis.meldingnav.navboertatakisaken.tittel', ledetekster)} jsClassName="navBoerTaTakISaken" />
        {
            !sykmelding.navBoerTaTakISakenBegrunnelse ? null :
            <div className="sykmelding-opplysning sykmelding-subopplysning">
                <h6>{getLedetekst('sykmelding.vis.meldingnav.navboertatakisaken.begrunnelse.tittel', ledetekster)}</h6>
                <p className="sykmelding-opplysning-verdi js-navBoerTaTakISakenBegrunnelse">{sykmelding.navBoerTaTakISakenBegrunnelse}</p>
            </div>
        }
    </div>);
};

MeldingTilNAV.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default MeldingTilNAV;
