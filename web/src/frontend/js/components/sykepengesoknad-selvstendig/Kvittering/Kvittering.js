import React from 'react';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import Sidetopp from '../../Sidetopp';
import IllustrertInnhold from '../../IllustrertInnhold';

const Kvittering = () => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.tittel')} />
        <div className="panel">
            <IllustrertInnhold
                ikon="/sykefravaer/img/svg/kvitteringhake.svg"
                ikonAlt="Hake">
                <h2 className="panel__tittel">
                    {getLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.undertittel')}
                </h2>
                <div
                    className="redaksjonelt-innhold"
                    dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.informasjon')} />
            </IllustrertInnhold>
        </div>
        <p className="ikke-print blokk navigasjonsstripe">
            <Link to="/sykefravaer/soknader" className="tilbakelenke">
                Gå til dine sykepengesøknader
            </Link>
        </p>
    </div>)
}

export default Kvittering;

