import React, { PropTypes } from 'react';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import { getLedetekst } from '../ledetekster/index';
import { toDatePrettyPrint } from '../utils/datoUtils';
import Varselstripe from './Varselstripe';

const KvitteringPanel = ({ sykmelding, ledetekster }) => {
    return (
        <div className="panel blokk">
           <Varselstripe type="suksess">
               <div className="rad-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.status', ledetekster)}>
                        <p className="js-status">Sendt til arbeidsgiver</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.dato', ledetekster)}>
                        <p className="js-dato">{toDatePrettyPrint(sykmelding.sendtdato)}</p>
                    </SykmeldingNokkelOpplysning>
                </div>

                <div className="rad-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.arbeidsgiver', ledetekster)} className="sist">
                        <p className="js-arbeidsgiver">{sykmelding.innsendtArbeidsgivernavn}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.organisasjonsnummer', ledetekster)} className="sist">
                        <p className="js-organisasjonsnummer">{sykmelding.orgnummer}</p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </Varselstripe>
        </div>);
};

KvitteringPanel.propTypes = {
    sykmelding: PropTypes.object,
    arbeidsgivere: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default KvitteringPanel;
