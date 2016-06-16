import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getLedetekst } from '../ledetekster/index';

const SykmeldingPeriode = ({ periode, antallDager = 1, ledetekster, Overskrift = 'H3' }) => {
    const dagNokkel = antallDager === 1 ? 'din-sykmelding.periode.dag' : 'din-sykmelding.periode.dager';
    return (<div className="sykmelding-nokkelopplysning">
            <Overskrift>{getLedetekst('din-sykmelding.periode.tittel', ledetekster)}</Overskrift>
            <p className="js-periode blokk-xxs">
                <strong>{toDatePrettyPrint(periode.fom)} &ndash; {toDatePrettyPrint(periode.tom)}</strong> &bull; {antallDager}&nbsp;{getLedetekst(dagNokkel, ledetekster)}
            </p>
            {
                periode.grad ? <p className="js-grad">
                    {periode.grad} % sykmeldt
                    {periode.reisetilskudd && (periode.grad > 0 && periode.grad < 100) ? (` ${getLedetekst('din-sykmelding.periode.med.reisetilskudd', ledetekster)}`) : null}
                </p> : ''
            }
            {
                periode.behandlingsdager ?
                    <p className="js-behandlingsdager">{periode.behandlingsdager} {getLedetekst('din-sykmelding.periode.behandlingsdager', ledetekster)}</p> : null
            }
            {
                periode.reisetilskudd && (periode.grad === null) ?
                    <p className="js-reisetilskudd">{getLedetekst('din-sykmelding.periode.reisetilskudd.tittel', ledetekster)}</p> : null
            }
            {
                periode.avventende ? <div className="blokk"><p className="js-avventende">{getLedetekst('din-sykmelding.periode.avventende', ledetekster)}</p></div> : null
            }
            {
                periode.avventende ? <h4>{getLedetekst('din-sykmelding.periode.avventende.innspill', ledetekster)}</h4> : null
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
    Overskrift: PropTypes.string,
};

export default SykmeldingPeriode;
