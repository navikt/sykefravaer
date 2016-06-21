import React, { PropTypes } from 'react';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import { getLedetekst } from '../ledetekster/index';
import { toDatePrettyPrint } from '../utils/datoUtils';

const KvitteringPanel = ({ sykmelding, ledetekster }) => {
    return (
        <div className="panel blokk">
           <div className="varselstripe varselstripe--success">
               <div className="rad-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.status', ledetekster)}>
                        <p className="js-status">Sendt til arbeidsgiver</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.dato', ledetekster)}>
                        <p className="js-dato">{toDatePrettyPrint(sykmelding.sendtdato)}</p>
                    </SykmeldingNokkelOpplysning>
                </div>

                <div className="rad-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.arbeidsgiver', ledetekster)}>
                        <p className="js-arbeidsgiver">{sykmelding.innsendtArbeidsgivernavn}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.organisasjonsnummer', ledetekster)}>
                        <p className="js-organisasjonsnummer">{sykmelding.orgnummer}</p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </div>
        </div>);
};

KvitteringPanel.propTypes = {
    sykmelding: PropTypes.object,
    arbeidsgivere: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default KvitteringPanel;
