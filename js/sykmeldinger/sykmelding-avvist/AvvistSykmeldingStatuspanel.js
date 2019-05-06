import React from 'react';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../../components/Statuspanel';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

export const AvvistSykmeldingStatuspanel = ({ smSykmelding }) => {
    return smSykmelding.bekreftetDato ?
        (<Statuspanel className="blokk--xl">
            <Statusopplysninger>
                <StatusNokkelopplysning tittel="Status">
                    <p>Avvist av NAV</p>
                </StatusNokkelopplysning>
                <StatusNokkelopplysning tittel="Bekreftet av deg">
                    <p>{tilLesbarDatoMedArstall(smSykmelding.bekreftetDato)}</p>
                </StatusNokkelopplysning>
            </Statusopplysninger>
        </Statuspanel>)
        : null;
};

AvvistSykmeldingStatuspanel.propTypes = {
    smSykmelding: smSykmeldingPt,
};
