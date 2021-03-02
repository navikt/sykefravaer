import React from 'react';
import { sykmeldingstatuser } from '../../digisyfoNpm';
import {
    Sykmeldingstatus, SendtDato, Arbeidsgiver, Orgnummer,
} from './SykmeldingStatuspanelOpplysning';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import GjenaapneSykmeldingContainer from './GjenaapneSykmeldingContainer';
import Statuspanel, { Statusopplysninger } from '../../components/Statuspanel';

export const Nokkelopplysninger = ({ sykmelding }) => {
    switch (sykmelding.status) {
        case sykmeldingstatuser.SENDT:
        case sykmeldingstatuser.TIL_SENDING: {
            return (
                <Statusopplysninger>
                    <Sykmeldingstatus sykmelding={sykmelding} />
                    <SendtDato sykmelding={sykmelding} />
                    <Arbeidsgiver sykmelding={sykmelding} />
                    <Orgnummer sykmelding={sykmelding} />
                </Statusopplysninger>
            );
        }
        case sykmeldingstatuser.AVBRUTT: {
            return (
                <Statusopplysninger>
                    <Sykmeldingstatus sykmelding={sykmelding} />
                    <SendtDato sykmelding={sykmelding} />
                </Statusopplysninger>
            );
        }
        case sykmeldingstatuser.UTGAATT: {
            return (
                <Statusopplysninger>
                    <Sykmeldingstatus sykmelding={sykmelding} />
                </Statusopplysninger>
            );
        }
        default: {
            return null;
        }
    }
};

Nokkelopplysninger.propTypes = {
    sykmelding: sykmeldingPt,
};

const SykmeldingStatuspanel = ({ sykmelding }) => {
    return (
        <Statuspanel>
            <Nokkelopplysninger sykmelding={sykmelding} />
            {
                sykmelding.status === sykmeldingstatuser.AVBRUTT && !sykmelding.erEgenmeldt
                && <GjenaapneSykmeldingContainer sykmeldingId={sykmelding.id} />
            }
        </Statuspanel>
    );
};

SykmeldingStatuspanel.propTypes = {
    sykmelding: sykmeldingPt,
};

export default SykmeldingStatuspanel;
