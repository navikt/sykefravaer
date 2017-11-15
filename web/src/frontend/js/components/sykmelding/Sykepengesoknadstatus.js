import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, getHtmlLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { Link } from 'react-router';
import { NY, SENDT, FREMTIDIG, AVBRUTT, UTGAATT, TIL_SENDING } from '../../enums/sykepengesoknadstatuser';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { Soknadsdatoliste } from './SykmeldingKvittering';

const LenkeTilSoknader = () => {
    return (<p className="sist">
        <Link to="/sykefravaer/soknader/" className="lenke">
            {getLedetekst('sykmelding.sykepengesoknadstatus.soknader.lenke')}
        </Link>
    </p>);
};

export const PapirsoknadMelding = () => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/digital-til-papir.svg" ikonAlt="">
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.sykepengesoknadstatus.papir.melding')} />
    </IllustrertInnhold>);
};

export const FlereSoknader = ({ sykepengesoknader }) => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/digital-til-papir.svg" ikonAlt="">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.flere.tittel')}</h2>
            <Soknadsdatoliste sykepengesoknader={sykepengesoknader} visStatus />
            <LenkeTilSoknader />
        </div>
    </IllustrertInnhold>);
};

FlereSoknader.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const SokOmSykepengerNaa = ({ sykepengesoknad }) => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringSokSykepenger.svg" ikonAlt="Søk om sykepenger">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sok.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.sok.melding')}</p>
            <p className="sist">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}`} className="knapp">
                    {getLedetekst('sykmelding.sykepengesoknadstatus.sok.lenke')}
                </Link>
            </p>
        </div>
    </IllustrertInnhold>);
};

SokOmSykepengerNaa.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export const SoknadSendtBekreftelse = () => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/sykepengesoknad--sendt.svg" ikonAlt="Dataskjerm med hake">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sokt.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.sokt.melding')}</p>
            <LenkeTilSoknader />
        </div>
    </IllustrertInnhold>);
};

export const KommendeSoknad = ({ sykepengesoknad }) => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringSokSykepenger.svg" ikonAlt="Søk om sykepenger">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sok-senere.tittel')}</h2>
            <p dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.sykepengesoknadstatus.sok-senere.melding', {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.tom),
            })} />
        </div>
    </IllustrertInnhold>);
};

KommendeSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export const SoknadAvbruttBekreftelse = ({ sykepengesoknad }) => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/sykepengesoknad--avbrutt.svg" ikonAlt="Dataskjerm med utropstegn">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.avbrutt.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.avbrutt.melding')}</p>
            <p className="sist">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}`}>
                    {getLedetekst('sykmelding.sykepengesoknadstatus.avbrutt.lenke')}
                </Link>
            </p>
        </div>
    </IllustrertInnhold>);
};

SoknadAvbruttBekreftelse.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export const UtgaattSoknadBekreftelse = () => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/sykepengesoknad--utgaatt.svg" ikonAlt="Dataskjerm med utropstegn">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.utgaatt.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.utgaatt.melding')}</p>
            <LenkeTilSoknader />
        </div>
    </IllustrertInnhold>);
};

const Sykepengesoknadstatus = ({ sykepengesoknader }) => {
    const el = (() => {
        if (sykepengesoknader.length === 0) {
            return <PapirsoknadMelding />;
        }
        if (sykepengesoknader.length > 1) {
            return <FlereSoknader sykepengesoknader={sykepengesoknader} />;
        }
        const soknad = sykepengesoknader[0];
        switch (soknad.status) {
            case NY: {
                return <SokOmSykepengerNaa sykepengesoknad={soknad} />;
            }
            case FREMTIDIG: {
                return <KommendeSoknad sykepengesoknad={soknad} />;
            }
            case SENDT:
            case TIL_SENDING: {
                return <SoknadSendtBekreftelse sykepengesoknad={soknad} />;
            }
            case UTGAATT: {
                return <UtgaattSoknadBekreftelse />;
            }
            case AVBRUTT: {
                return <SoknadAvbruttBekreftelse sykepengesoknad={soknad} />;
            }
            default: {
                return null;
            }
        }
    })();
    if (!el) {
        return null;
    }
    return (<div className="panel panel--komprimert blokk">
        {el}
    </div>);
};

Sykepengesoknadstatus.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export default Sykepengesoknadstatus;
