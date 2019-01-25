import React from 'react';
import { getLedetekst, sykmelding as sykmeldingPt, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import AngreBekreftSykmeldingContainer from '../../containers/sykmelding/AngreBekreftSykmeldingContainer';
import { Frilansersporsmal } from './SykmeldingStatuspanelOpplysning';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import { tilStorForbokstav } from '../../utils';

const BekreftetSykmeldingStatuspanel = ({ sykmelding }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p className="js-status">
                    {getLedetekst(`statuspanel.status.${sykmelding.status}`)} – {tilLesbarDatoMedArstall(sykmelding.sendtdato)}
                </p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.3')}>
                <p className="js-arbeidssituasjon">
                    {tilStorForbokstav(getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${sykmelding.valgtArbeidssituasjon.toLowerCase()}.2`))}
                </p>
            </StatusNokkelopplysning>
            <Frilansersporsmal sykmelding={sykmelding} />
        </Statusopplysninger>
        <AngreBekreftSykmeldingContainer sykmelding={sykmelding} />
    </Statuspanel>);
};

BekreftetSykmeldingStatuspanel.propTypes = {
    sykmelding: sykmeldingPt,
};

export default BekreftetSykmeldingStatuspanel;
