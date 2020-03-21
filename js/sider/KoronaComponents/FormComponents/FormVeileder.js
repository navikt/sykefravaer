import React, { Element } from 'react';
import PropTypes from 'prop-types';

import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import { Knapp } from 'nav-frontend-knapper';


const FormVeileder = ({ formElement }) => {
    return (
        <div
            style={{ marginTop: '4rem' }}>
            <Bjorn
                className="blokk"
                hvit
                stor>
                            Hei, vanligvis er det en behandler som sykmelder deg og sender den inn til oss.
                            I dette tilfellet blir du selv nødt til å opprette sykmeldingen før du kan bekrefte- og sende den inn.
                <br />
                <br />
                <Knapp onClick={() => {
                    formElement.current.scrollIntoView({ behavior: 'smooth' });
                }}>
Opprett nå
                </Knapp>
            </Bjorn>
        </div>
    );
};

FormVeileder.propTypes = {
    formElement: PropTypes.oneOfType([
        // Either a function
        PropTypes.func,
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
};

export default FormVeileder;
