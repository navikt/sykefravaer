import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const MeldingTilArbeidsgiver = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.innspillTilArbeidsgiver;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.meldingarbeidsgiver.tittel', ledetekster)}</h4>
            {
                getSykmeldingOpplysning(sykmelding, 'innspillTilArbeidsgiver', getLedetekst('sykmeldnig.vis.meldingarbeidsgiver.innspill.tittel', ledetekster))
            }
    </div>);
};


MeldingTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default MeldingTilArbeidsgiver;
