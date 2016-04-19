import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';

const SykmeldingTeaser = ({ sykmelding, ledetekster }) => {
    const days = getDuration(sykmelding.fom, sykmelding.tom);

    return (<article>
        <Link className="panel sykmelding-teaser" key={sykmelding.id} to={getContextRoot() + '/sykmeldinger/' + sykmelding.id}>
        <span className="teaser-ikon">
            <img src="/sykefravaer/img/svg/lege.svg" alt="Lege" />
        </span>
        <div className="teaser-innhold">
            <h3 className="js-title teaser-header">
                <small className="teaser-meta">{getLedetekst('sykmelding.teaser.dato', ledetekster, {
                    '%FOM%': formatDate(sykmelding.fom),
                    '%TOM%': formatDate(sykmelding.tom),
                })} </small>
                <span className="teaser-tittel">
                    {getLedetekst('sykmelding.teaser.tittel', ledetekster)}
                </span>
            </h3>
            <p className="js-meta typo-infotekst">
                {getLedetekst('sykmelding.teaser.tekst', ledetekster, {
                    '%GRAD%': sykmelding.grad,
                    '%ARBEIDSGIVER%': sykmelding.arbeidsgiver,
                    '%DAGER%': days,
                })}
            </p>
        </div>
    </Link></article>);
};

SykmeldingTeaser.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    ledetekster: PropTypes.object,
};

export default SykmeldingTeaser;
