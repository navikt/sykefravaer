import React from 'react';
import { StatusNokkelopplysning } from '../../components/Statuspanel';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

export const AvvistSykmeldingStatuspanel = ({ smSykmelding }) => {
    return smSykmelding.bekreftetDato ?
        (
            <div className="panel panel--komprimert statuspanel blokk--xl statuspanel--avvistSykmelding">
                <StatusNokkelopplysning tittel="Status">
                    <p>Avvist av NAV</p>
                </StatusNokkelopplysning>
                <StatusNokkelopplysning tittel="Dato avvist">
                    <p>{tilLesbarDatoMedArstall(smSykmelding.mottattTidspunkt)}</p>
                </StatusNokkelopplysning>
                <StatusNokkelopplysning tittel="Bekreftet av deg">
                    <p>{tilLesbarDatoMedArstall(smSykmelding.bekreftetDato)}</p>
                </StatusNokkelopplysning>
            </div>
        )
        : null;
};

AvvistSykmeldingStatuspanel.propTypes = {
    smSykmelding: smSykmeldingPt,
};
