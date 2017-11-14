import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { NY, SENDT, FREMTIDIG } from '../../enums/sykepengesoknadstatuser';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { Soknadsdatoliste } from './SykmeldingKvittering';

export const PapirsoknadMelding = () => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/digital-til-papir.svg" ikonAlt="">
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.sykepengesoknadstatus.papir.melding')} />
    </IllustrertInnhold>);
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
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringhake.svg" ikonAlt="Hake">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sokt.tittel')}</h2>
            <p className="sist">{getLedetekst('sykmelding.sykepengesoknadstatus.sokt.melding')}</p>
        </div>
    </IllustrertInnhold>);
};

export const KommendeSoknader = ({ sykepengesoknader }) => {
    return (<IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringSokSykepenger.svg" ikonAlt="Søk om sykepenger">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sok-senere.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.sok-senere.melding')}</p>
            <Soknadsdatoliste sykepengesoknader={sykepengesoknader} />
        </div>
    </IllustrertInnhold>);
};

KommendeSoknader.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

const Sykepengesoknadstatus = ({ sykepengesoknader }) => {
    const nyeSoknader = sykepengesoknader.filter((s) => {
        return s.status === NY;
    });
    const sendteSoknader = sykepengesoknader.filter((s) => {
        return s.status === SENDT;
    });
    const fremtidigeSoknader = sykepengesoknader.filter((s) => {
        return s.status === FREMTIDIG;
    });

    return (<div className="panel panel--komprimert blokk">
        {
            (() => {
                if (nyeSoknader.length > 0) {
                    return <SokOmSykepengerNaa sykepengesoknad={nyeSoknader[0]} />;
                }
                if (fremtidigeSoknader.length > 0) {
                    return <KommendeSoknader sykepengesoknader={fremtidigeSoknader} />;
                }
                if (sendteSoknader.length > 0) {
                    return <SoknadSendtBekreftelse />;
                }
                return <PapirsoknadMelding />;
            })()
        }
    </div>);
};

Sykepengesoknadstatus.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export default Sykepengesoknadstatus;
