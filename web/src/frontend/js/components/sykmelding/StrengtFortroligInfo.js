import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getHtmlLedetekst } from '../../ledetekster';
import { getContextRoot } from '../../routers/paths.js';

const StrengtFortroligInfo = ({ sykmeldingId, ledetekster }) => {
    return (<div className="panel panel-ramme blokk">
            <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold"
                dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.skjermingskode-6.infotekst', ledetekster)}>
            </div>
            <div className="knapperad">
                <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmeldingId}/skriv-ut`} className="rammeknapp">Skriv ut</Link>
            </div>
        </div>);
};

StrengtFortroligInfo.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    sykmeldingId: PropTypes.string.isRequired,
};

export default StrengtFortroligInfo;
