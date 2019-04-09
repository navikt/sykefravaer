import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Knapperad from '../../../components/skjema/Knapperad';
import { soknadPt } from '../../prop-types/soknadProptype';

const KnapperadEttSporsmalPerSide = ({ soknad, sidenummer }) => {
    const visForrige = sidenummer > 1;

    return (<Knapperad variant="knapperad--forrigeNeste knapperad--medAvbryt">
        {
            visForrige
            && (<Link
                to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/${sidenummer - 1}`}
                className="knapp">{getLedetekst('sykepengesoknad.tilbake')}</Link>)
        }
        <button type="submit" className="knapp knapp--hoved js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
    </Knapperad>);
};

KnapperadEttSporsmalPerSide.propTypes = {
    sidenummer: PropTypes.number,
    soknad: soknadPt,
};

export default KnapperadEttSporsmalPerSide;
