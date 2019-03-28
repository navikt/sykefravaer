import { getHtmlLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import PropTypes from 'prop-types';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Mann from './Mann';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const VeilederRad = ({ maksDato }) => {
    return (
        <ArbeidsrettetOppfolgingRad>
            <Veilederpanel type="plakat" center kompakt svg={<Mann />} veilederProps={{ center: true }}>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.intro.tekst', { '%DATO%': maksDato })} />
            </Veilederpanel>
        </ArbeidsrettetOppfolgingRad>
    );
};

VeilederRad.propTypes = {
    maksDato: PropTypes.string,
};

export default VeilederRad;
