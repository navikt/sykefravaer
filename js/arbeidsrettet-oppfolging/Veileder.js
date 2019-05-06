import { getHtmlLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import PropTypes from 'prop-types';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Mann from '../components/svg/Mann';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const Veileder = ({ maksDato }) => {
    return (
        <ArbeidsrettetOppfolgingRad>
            <Veilederpanel fargetema="advarsel" type="plakat" center kompakt svg={<Mann />} veilederProps={{ center: true, storrelse: 'S' }}>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('ao.veileder.tekst', { '%DATO%': maksDato })} />
            </Veilederpanel>
        </ArbeidsrettetOppfolgingRad>
    );
};

Veileder.propTypes = {
    maksDato: PropTypes.string,
};

export default Veileder;
