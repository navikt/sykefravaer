import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { SykmeldingCheckbox } from './SykmeldingCheckbox.js';

const MeldingTilNAV = ({ sykmelding, ledetekster }) => {
    if (!sykmelding.navBoerTaTakISaken) {
        return <span />;
    }
	return (<div className="sykmelding-seksjon">
        <h4 className="sykmelding-seksjonstittel">Melding til NAV</h4>
        <SykmeldingCheckbox tekst="NAV bør ta tak i saken nå" jsClassName="navBoerTaTakISaken" />
        {
            !sykmelding.navBoerTaTakISakenBegrunnelse ? '' : 
            <div className="sykmelding-opplysning sykmelding-subopplysning">
                <h6>Begrunnelse</h6>
                <p className="js-navBoerTaTakISakenBegrunnelse">{sykmelding.navBoerTaTakISakenBegrunnelse}</p>
            </div>
        }
	</div>);
};

export default MeldingTilNAV;
