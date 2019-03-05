import { getHtmlLedetekst, Bjorn } from '@navikt/digisyfo-npm';
import React from 'react';
import PropTypes from 'prop-types';

const VeilederRad = ({ maksDato }) => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Bjorn stor hvit>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.intro.tekst', { '%DATO%': maksDato })} />
                </Bjorn>
            </div>
        </div>
    );
};

VeilederRad.propTypes = {
    maksDato: PropTypes.string,
};

export default VeilederRad;
