import React from 'react';
import { StatusNokkelopplysning, Statusopplysninger } from '../../components/Statuspanel';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

export const AvvistSykmeldingStatuspanel = ({ smSykmelding }) => (
    smSykmelding.bekreftetDato
        ? (
            <div className="panel panel--komprimert statuspanel blokk--xl statuspanel--treKol">
                <Statusopplysninger>
                    <StatusNokkelopplysning tittel="Status">
                        <p>Avvist av NAV</p>
                    </StatusNokkelopplysning>
                    <StatusNokkelopplysning tittel="Dato avvist">
                        <p>{tilLesbarDatoMedArstall(smSykmelding.mottattTidspunkt)}</p>
                    </StatusNokkelopplysning>
                    <StatusNokkelopplysning tittel="Bekreftet av deg">
                        <p>{tilLesbarDatoMedArstall(smSykmelding.bekreftetDato)}</p>
                    </StatusNokkelopplysning>
                </Statusopplysninger>
            </div>
        )
        : null
);

AvvistSykmeldingStatuspanel.propTypes = {
    smSykmelding: smSykmeldingPt,
};
