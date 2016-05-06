import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const AndreSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
	return (<div>
                {
                    sykmelding.sykmelderTlf || sykmelding.sykmeldingDato ? <h4 className="sykmelding-seksjonstittel">Annet</h4> : ''
                }
                {
                    getSykmeldingOpplysning(sykmelding, "sykmelderTlf", "Telefon til lege/sykmelder")
                }
                {
                    getSykmeldingOpplysning(sykmelding, "sykmeldingDato", "Dato sykmeldingen ble skrevet", formatDate(sykmelding.sykmeldingDato))
                }
		</div>);
};

AndreSykmeldingOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default AndreSykmeldingOpplysninger;
