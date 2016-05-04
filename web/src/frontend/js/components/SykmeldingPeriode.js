import React, { PropTypes } from 'react';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning.js';
import { formatDate } from '../utils/index.js';

const SykmeldingPeriode = ({periode, antallDager = 1}) => {
    return (<div className="sykmelding-nokkelopplysning">
            <h3>Periode</h3>
            <p className="js-periode blokk-xxs">
                <strong>{formatDate(periode.fom)} &ndash; {formatDate(periode.tom)}</strong> &bull; {antallDager + (antallDager === 1 ? ' dag' : ' dager')}
            </p>
            {
                periode.grad ? <p className="js-grad">
                    {periode.grad} % sykmeldt
                    {periode.reisetilskudd && (periode.grad > 0 && periode.grad < 100) ? ' med reisetilskudd' : ''}
                </p> : ''
            }
            {
                periode.behandlingsdager ? <p className="js-behandlingsdager">{periode.behandlingsdager} behandlingsdager</p> : ''
            }
            {
                periode.reisetilskudd && (periode.grad === null) ? <p className="js-reisetilskudd">Reisetilskudd</p> : ''
            }
            {
                periode.avventende ? <div className="blokk"><p className="js-avventende">Avventende sykmelding</p></div> : ''
            }
            {
                periode.avventende ? <h3>Innspill til arbeidsgiver om tilrettelegging</h3> : ''
            }
            {
                periode.avventende ? <p>{periode.avventende}</p> : ''
            }
    </div>);
};

SykmeldingPeriode.propTypes = {
    periode: PropTypes.object.isRequired,
    dager: PropTypes.number,
};

export default SykmeldingPeriode;
