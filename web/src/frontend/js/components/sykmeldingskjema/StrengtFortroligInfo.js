import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';

const StrengtFortroligInfo = ({ sykmeldingId, ledetekster }) => {
    return (<div className="panel panel-ramme blokk">
        <div className="hode hode--advarsel redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.skjermingskode-6.infotekst', ledetekster)}>
        </div>
        <div className="knapperad">
            <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmeldingId}/skriv-ut`} className="rammeknapp">
                {getLedetekst('send-til-arbeidsgiver.skjermingskode-6.skriv-ut', ledetekster)}
            </Link>
        </div>
    </div>);
};

StrengtFortroligInfo.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    sykmeldingId: PropTypes.string.isRequired,
};

export default StrengtFortroligInfo;
