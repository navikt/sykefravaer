import React, { PropTypes } from 'react';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import { getLedetekst } from '../ledetekster/index';

const KvitteringPanel = ({ sykmelding, ledetekster }) => {
    if (sykmelding.status !== 'SENDT') {
        return <noscript />;
    }

    return (
        <div className="panel blokk-s side-innhold">

           <div className="varselstripe varselstripe--success">
           <div className="rad-container">
                <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.status', ledetekster)}>
                    <p className="js-arbeidsgiver">Sendt til arbeidsgiver</p>
                </SykmeldingNokkelOpplysning>

                <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.dato', ledetekster)}>
                    <p className="js-arbeidsgiver">12.06.2016</p>
                </SykmeldingNokkelOpplysning>
            </div>

            <div className="rad-container">
                <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.arbeidsgiver', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                </SykmeldingNokkelOpplysning>

                <SykmeldingNokkelOpplysning tittel={getLedetekst('kvittering.organisasjonsnummer', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykmelding.organisasjonsnummer}</p>
                </SykmeldingNokkelOpplysning>
            </div>
                </div>
        </div>
        );
};

KvitteringPanel.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default KvitteringPanel;
