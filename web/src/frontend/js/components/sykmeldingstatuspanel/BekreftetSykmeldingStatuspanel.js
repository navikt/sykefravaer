import React from 'react';
import { getLedetekst, sykmelding as sykmeldingPt, toDatePrettyPrint } from 'digisyfo-npm';
import AngreBekreftSykmeldingContainer from '../../containers/sykmelding/AngreBekreftSykmeldingContainer';
import { Frilansersporsmal} from './SykmeldingStatuspanelOpplysning';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';

const BekreftetSykmeldingStatuspanel = ({ sykmelding }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p className="js-status">
                    {getLedetekst(`statuspanel.status.${sykmelding.status}`)} – {toDatePrettyPrint(sykmelding.sendtdato)}
                </p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}>
                <p className="js-arbeidssituasjon">
                    {getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${sykmelding.valgtArbeidssituasjon.toLowerCase()}`)}
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
