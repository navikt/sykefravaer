import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';

const StrengtFortroligInfo = ({ sykmeldingId }) => {
    return (<div className="panel panel-ramme blokk">
        <div className="hode hode--advarsel redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.skjermingskode-6.infotekst')}>
        </div>
        <div className="knapperad">
            <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmeldingId}/skriv-ut`} className="rammeknapp">
                {getLedetekst('send-til-arbeidsgiver.skjermingskode-6.skriv-ut')}
            </Link>
        </div>
    </div>);
};

StrengtFortroligInfo.propTypes = {
    sykmeldingId: PropTypes.string.isRequired,
};

export default StrengtFortroligInfo;
