import React from 'react';
import { Bjorn, getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import Header from '../../../containers/sykepengesoknad-utland/SykepengesoknadUtlandHeader';
import { IllustrertInnholdGronnHake } from '../../IllustrertInnhold';
import { getContextRoot } from '../../../routers/paths';

const Kvittering = () => {
    return (<div>
        <Header />
        <div className="panel blokk" >
            <IllustrertInnholdGronnHake>
                <h2 className="illustrertInnhold__tittel panel__tittel">
                    {getLedetekst('sykepengesoknad-utland.kvittering.sendt.undertittel')}
                </h2>
                <div
                    className="redaksjonelt-innhold"
                    dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad-utland.kvittering.sendt.informasjon')} />
            </IllustrertInnholdGronnHake>
        </div>
        <div className="blokk">
            <Bjorn rootUrl={getContextRoot()} hvit stor>
                <p>{ getLedetekst('sykepengesoknad-utland.kvittering.sendt.bjorn') }</p>
            </Bjorn>
        </div>
        <p className="ikke-print blokk navigasjonsstripe">
            <Link to="/sykefravaer" className="tilbakelenke">
                {getLedetekst('sykepengesoknad.navigasjon.gaa-til-sykefravaer')}
            </Link>
        </p>
    </div>);
};

export default Kvittering;
