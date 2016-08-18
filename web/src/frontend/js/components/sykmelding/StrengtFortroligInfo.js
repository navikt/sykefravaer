import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ArbeidsgiversSykmeldingContainer from '../../containers/ArbeidsgiversSykmeldingContainer';
import { getHtmlLedetekst } from '../../ledetekster';
import { getContextRoot } from '../../routers/paths.js';

const StrengtFortroligInfo = ({ sykmeldingId, ledetekster }) => {
    return (<div>
        <h2 className="typo-innholdstittel">Send til arbeidsgiveren din</h2>
        <div className="panel panel-ramme">
            <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold"
                dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.skjermingskode-6.infotekst', ledetekster)}>
            </div>
            <div className="knapperad">
                <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmeldingId}/skriv-ut`} className="knapp knapp-hoved">Skriv ut</Link>
            </div>
        </div>
        <ArbeidsgiversSykmeldingContainer sykmeldingId={sykmeldingId} />
    </div>);
};

StrengtFortroligInfo.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    sykmeldingId: PropTypes.string.isRequired,
};

export default StrengtFortroligInfo;
