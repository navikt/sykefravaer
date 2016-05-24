import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';

const SykmeldingPeriode = ({ periode, antallDager = 1, ledetekster }) => {
    const dagNokkel = antallDager === 1 ? 'sykmelding.vis.periode.dag' : 'sykmelding.vis.periode.dager';
    return (<div className="sykmelding-nokkelopplysning">
            <h3>{getLedetekst('sykmelding.vis.periode.tittel', ledetekster)}</h3>
            <p className="js-periode blokk-xxs">
                <strong>{formatDate(periode.fom)} &ndash; {formatDate(periode.tom)}</strong> &bull; {antallDager}&nbsp;{getLedetekst(dagNokkel, ledetekster)}
            </p>
            {
                periode.grad ? <p className="js-grad">
                    {periode.grad} % sykmeldt
                    {periode.reisetilskudd && (periode.grad > 0 && periode.grad < 100) ? (` ${getLedetekst('sykmelding.vis.periode.med.reisetilskudd', ledetekster)}`) : null}
                </p> : ''
            }
            {
                periode.behandlingsdager ?
                    <p className="js-behandlingsdager">{periode.behandlingsdager} {getLedetekst('sykmelding.vis.periode.behandlingsdager', ledetekster)}</p> : null
            }
            {
                periode.reisetilskudd && (periode.grad === null) ?
                    <p className="js-reisetilskudd">{getLedetekst('sykmelding.vis.periode.reisetilskudd.tittel', ledetekster)}</p> : null
            }
            {
                periode.avventende ? <div className="blokk"><p className="js-avventende">{getLedetekst('sykmelding.vis.periode.avventende', ledetekster)}</p></div> : null
            }
            {
                periode.avventende ? <h4>{getLedetekst('sykmelding.vis.periode.avventende.innspill', ledetekster)}</h4> : null
            }
            {
                periode.avventende ? <p>{periode.avventende}</p> : ''
            }
    </div>);
};

SykmeldingPeriode.propTypes = {
    periode: PropTypes.object.isRequired,
    antallDager: PropTypes.number,
    ledetekster: PropTypes.object,
};

export default SykmeldingPeriode;
