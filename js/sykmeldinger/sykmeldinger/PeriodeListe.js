/* eslint arrow-body-style: ["error", "as-needed"] */

import PropTypes from 'prop-types';
import React from 'react';
import SykmeldingPeriodeinfo from './SykmeldingPeriodeinfo';
import { sykmeldingperiode } from '../../propTypes';

export const PeriodeListe = ({ perioder, arbeidsgiver }) => (
    <ul className="teaser-punktliste js-perioder">
        {
            perioder
                .map((periode, index) => (
                    <SykmeldingPeriodeinfo
                        key={index}
                        periode={periode}
                        arbeidsgiver={arbeidsgiver}
                        Element="li"
                    />
                ))
        }
    </ul>
);

PeriodeListe.propTypes = {
    arbeidsgiver: PropTypes.string,
    perioder: PropTypes.arrayOf(sykmeldingperiode),
};
