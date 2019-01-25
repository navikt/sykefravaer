import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlLedetekst, getLedetekst, sykepengesoknad as sykepengesoknadPt, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { Link } from 'react-router';
import IllustrertInnhold from '../IllustrertInnhold';
import Soknadsdatoliste from '../sykmeldingkvittering/Soknadsdatoliste';
import { soknad as soknadPt } from '../../propTypes';

const LenkeTilSoknader = () => {
    return (<p className="sist">
        <Link to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/`} className="lenke">
            {getLedetekst('sykmelding.sykepengesoknadstatus.soknader.lenke')}
        </Link>
    </p>);
};

export const PapirsoknadMelding = () => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/digital-til-papir.svg`} ikonAlt="">
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.sykepengesoknadstatus.papir.melding')} />
    </IllustrertInnhold>);
};

export const FlereSoknader = ({ sykepengesoknader }) => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/digital-til-papir.svg`} ikonAlt="">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.flere.tittel')}</h2>
            <Soknadsdatoliste sykepengesoknader={sykepengesoknader} visStatus />
            <LenkeTilSoknader />
        </div>
    </IllustrertInnhold>);
};

FlereSoknader.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(PropTypes.oneOfType([sykepengesoknadPt, soknadPt])),
};

export const SokOmSykepengerNaa = ({ sykepengesoknad }) => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/kvitteringSokSykepenger.svg`} ikonAlt="Søk om sykepenger">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sok.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.sok.melding')}</p>
            <p className="sist">
                <Link to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${sykepengesoknad.id}`} className="knapp knapp--hoved">
                    {getLedetekst('sykmelding.sykepengesoknadstatus.sok.lenke')}
                </Link>
            </p>
        </div>
    </IllustrertInnhold>);
};

SokOmSykepengerNaa.propTypes = {
    sykepengesoknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]),
};

export const SoknadSendtBekreftelse = () => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykepengesoknad--sendt.svg`} ikonAlt="Dataskjerm med hake">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sokt.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.sokt.melding')}</p>
            <LenkeTilSoknader />
        </div>
    </IllustrertInnhold>);
};

export const KommendeSoknad = ({ sykepengesoknad }) => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/kvitteringSokSykepenger.svg`} ikonAlt="Søk om sykepenger">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.sok-senere.tittel')}</h2>
            <p dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.sykepengesoknadstatus.sok-senere.melding', {
                '%DATO%': tilLesbarDatoMedArstall(sykepengesoknad.tom),
            })} />
        </div>
    </IllustrertInnhold>);
};

KommendeSoknad.propTypes = {
    sykepengesoknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]),
};

export const SoknadAvbruttBekreftelse = ({ sykepengesoknad }) => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykepengesoknad--avbrutt.svg`} ikonAlt="Dataskjerm med utropstegn">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.avbrutt.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.avbrutt.melding')}</p>
            <p className="sist">
                <Link className="lenke" to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${sykepengesoknad.id}`}>
                    {getLedetekst('sykmelding.sykepengesoknadstatus.avbrutt.lenke')}
                </Link>
            </p>
        </div>
    </IllustrertInnhold>);
};

SoknadAvbruttBekreftelse.propTypes = {
    sykepengesoknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]),
};

export const UtgaattSoknadBekreftelse = () => {
    return (<IllustrertInnhold ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykepengesoknad--utgaatt.svg`} ikonAlt="Dataskjerm med utropstegn">
        <div>
            <h2 className="panel__tittel">{getLedetekst('sykmelding.sykepengesoknadstatus.utgaatt.tittel')}</h2>
            <p>{getLedetekst('sykmelding.sykepengesoknadstatus.utgaatt.melding')}</p>
            <LenkeTilSoknader />
        </div>
    </IllustrertInnhold>);
};
