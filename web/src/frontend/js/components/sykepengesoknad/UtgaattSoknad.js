import React from 'react';
import Sidetopp from '../Sidetopp';
import { getLedetekst, Varselstripe, toDatePrettyPrint } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { Link } from 'react-router';

const UtgaattSoknad = ({ sykepengesoknad, korrigertSoknad }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        <div className="panel panel--komprimert">
            <Varselstripe type="info" fylt>
                <p className="sist">{getLedetekst('sykepengesoknad.utgaatt.info.tekst')}</p>
            </Varselstripe>
        </div>
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} erApen />
        { korrigertSoknad ? <Link className="lenke" to={`/sykefravaer/soknader/${korrigertSoknad.id}`}>Korrigerer søknad du sendte {toDatePrettyPrint(korrigertSoknad.sendtTilNAVDato || korrigertSoknad.sendtTilArbeidsgiverDato)}</Link> : null }
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    korrigertSoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
