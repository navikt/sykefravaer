import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, getSykmelding, sorterSykmeldingerEldsteFoerst, sykmeldingstatuser } from 'digisyfo-npm';
import { connect } from 'react-redux';

const { NY } = sykmeldingstatuser;

const EldreSykmeldingVarsel = ({ visEldreSykmeldingVarsel, eldsteSykmeldingId }) => {
    return visEldreSykmeldingVarsel
        ? (<Alertstripe type="info" className="blokk">
            <p className="sist">
                <span>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.tekst')} </span>
                <Link className="lenke" to={`/sykefravaer/sykmeldinger/${eldsteSykmeldingId}`}>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.lenke')}</Link>
            </p>
        </Alertstripe>)
        : null;
};

EldreSykmeldingVarsel.propTypes = {
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
};

const getEldsteNyeSykmelding = (sykmeldinger) => {
    const nyeSykmeldinger = sykmeldinger.filter((_sykmelding) => {
        return _sykmelding.status === NY;
    });
    return sorterSykmeldingerEldsteFoerst(nyeSykmeldinger)[0];
};

const erEldsteSykmelding = (sykmeldinger, sykmeldingId) => {
    const eldsteSykmelding = getEldsteNyeSykmelding(sykmeldinger, sykmeldingId);
    return eldsteSykmelding && eldsteSykmelding.id === sykmeldingId;
};

const detFinnesAndreSykmeldingerMedSammePeriode = (sykmeldinger, sykmeldingId) => {
    const sykmelding = getSykmelding(sykmeldinger, sykmeldingId);
    if (!sykmelding || !sykmelding.mulighetForArbeid) {
        return false;
    }
    const denneSykmeldingensPerioder = JSON.stringify(sykmelding.mulighetForArbeid.perioder);
    const antallMedSammePerioder = sykmeldinger.filter((_sykmelding) => {
        return JSON.stringify(_sykmelding.mulighetForArbeid.perioder) === denneSykmeldingensPerioder;
    }).length;
    return antallMedSammePerioder > 1;
};

const harSammePeriodeSomDenEldsteSykmeldingen = (sykmeldinger, sykmeldingId) => {
    const sykmelding = getSykmelding(sykmeldinger, sykmeldingId);
    const eldsteSykmelding = sorterSykmeldingerEldsteFoerst(sykmeldinger)[0];
    return JSON.stringify(sykmelding.mulighetForArbeid.perioder) === JSON.stringify(eldsteSykmelding.mulighetForArbeid.perioder);
};

const visEldreSykmeldingVarsel = (sykmeldinger, sykmeldingId) => {
    const nyeSykmeldinger = sykmeldinger.filter((s) => {
        return s.status === NY;
    });
    const erEldst = erEldsteSykmelding(nyeSykmeldinger, sykmeldingId);
    return erEldst
        ? false
        : !(!erEldst
            && detFinnesAndreSykmeldingerMedSammePeriode(nyeSykmeldinger, sykmeldingId)
            && harSammePeriodeSomDenEldsteSykmeldingen(nyeSykmeldinger, sykmeldingId));
};

export const mapStateToProps = (state, ownProps) => {
    const eldsteNyeSykmelding = getEldsteNyeSykmelding(state.dineSykmeldinger.data);

    return {
        visEldreSykmeldingVarsel: visEldreSykmeldingVarsel(state.dineSykmeldinger.data, ownProps.sykmelding.id),
        eldsteSykmeldingId: eldsteNyeSykmelding ? eldsteNyeSykmelding.id : '',
    };
};

export default connect(mapStateToProps)(EldreSykmeldingVarsel);
