import React from 'react';
import { sykmelding as sykmeldingPt, getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import AngreBekreftSykmeldingContainer from '../../containers/sykmelding/AngreBekreftSykmeldingContainer';
import { StatusNokkelopplysning } from '../StatusOpplysning';
import { SykmeldingopplysningForsikring, SykmeldingopplysningFravaersperioder } from '../sykepengesoknad-selvstendig/SykmeldingUtdrag';
import { Vis } from '../../utils';

const Frilansersporsmal = ({ sykmelding }) => {
    return (<Vis
        hvis={sykmelding.sporsmal && (sykmelding.sporsmal.fravaerBesvart || sykmelding.sporsmal.dekningsgrad)}
        render={() => {
            return (<div className="statusopplysninger sist">
                <SykmeldingopplysningFravaersperioder sykmelding={sykmelding} className="nokkelopplysning--statusopplysning" />
                <SykmeldingopplysningForsikring sykmelding={sykmelding} className="nokkelopplysning--statusopplysning" />
            </div>);
        }} />);
};

Frilansersporsmal.propTypes = {
    sykmelding: sykmeldingPt,
};

const BekreftetSykmeldingStatuspanel = ({ sykmelding }) => {
    return (<div className="panel panel--komprimert blokk">
        <div className="statusopplysninger">
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
        </div>
        <Frilansersporsmal sykmelding={sykmelding} />
        <AngreBekreftSykmeldingContainer sykmelding={sykmelding} />
    </div>);
};

BekreftetSykmeldingStatuspanel.propTypes = {
    sykmelding: sykmeldingPt,
};

export default BekreftetSykmeldingStatuspanel;
