import React, { PropTypes } from 'react';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';

const SendSykmeldingKvittering = ({ sykmelding, ledetekster }) => {
    return (
        <div>
            <div className="panel blokk typo-infotekst panel-melding ">
                <h1 className="hode hode-suksess hode-undertittel hode-dekorert blokk">Sykmeldingen er sendt</h1>
                <p>
                    <span>{getLedetekst('kvittering.undertekst.tekst', ledetekster.data, { '%ARBEIDSGIVER%': sykmelding.data.arbeidsgiver })}</span><Link
                    to={`${getContextRoot()}/sykmeldinger`}>{getLedetekst('kvittering.undertekst.lenke', ledetekster.data)}</Link>
                </p>
            </div>

            <article className="panel blokk side-innhold">
                <h2 className="typo-undertittel">Skal du søke om sykepenger</h2>
                <div dangerouslySetInnerHTML={getHtmlLedetekst('kvittering.sok-om-sykpenger.tekst', ledetekster.data)}/>
            </article>
        </div>
    )
};

SendSykmeldingKvittering.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendSykmeldingKvittering;


