import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NY as NY_SYKMELDING } from '../enums/sykmeldingstatuser';
import { NY as NY_SYKEPENGESOKNAD } from '../enums/sykepengesoknadstatuser';
import { Link } from 'react-router';
import { sykepengesoknad as sykepengesoknadPt, sykmelding as sykmeldingPt } from '../propTypes';
import { getLedetekst } from 'digisyfo-npm';

const Li = ({ tekst, url }) => {
    return (<li>
        <Link to={url}>{tekst}</Link>
    </li>);
};

Li.propTypes = {
    tekst: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export const NySykmelding = ({ sykmeldinger }) => {
    const url = sykmeldinger.length === 1 ? `/sykefravaer/sykmeldinger/${sykmeldinger[0].id}` : '/sykefravaer/sykmeldinger';
    const tekst = sykmeldinger.length === 1 ? getLedetekst('dine-oppgaver.sykmeldinger.en-sykmelding') : getLedetekst('dine-oppgaver.sykmeldinger.flere-sykmeldinger', {
        '%ANTALL%': sykmeldinger.length.toString(),
    });
    return (<Li url={url} tekst={tekst} />);
};

NySykmelding.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export const NySykepengesoknad = ({ sykepengesoknader }) => {
    const url = sykepengesoknader.length === 1 ? `/sykefravaer/soknader/${sykepengesoknader[0].id}` : '/sykefravaer/soknader';
    const tekst = sykepengesoknader.length === 1 ? getLedetekst('dine-oppgaver.sykepengesoknader.en-soknad') : getLedetekst('dine-oppgaver.sykepengesoknader.flere-soknader', {
        '%ANTALL%': sykepengesoknader.length.toString(),
    });
    return (<Li url={url} tekst={tekst} />);
};

NySykepengesoknad.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const DineOppgaver = ({ sykmeldinger, sykepengesoknader, visOppgaver }) => {
    if (!visOppgaver) {
        return null;
    }
    return (<div className="dineOppgaver blokk">
        <div className="dineOppgaver__container">
            <div className="dineOppgaver__illustrasjon">
                <img src="/sykefravaer/img/svg/landingsside/oppgaver.svg" alt="Oppgaver" />
            </div>
            <div className="dineOppgaver__tekst">
                <h2 className="dineOppgaver__tittel js-tittel">{getLedetekst('dine-oppgaver.tittel')}</h2>
                <ul className="dineOppgaver__liste">
                    { sykmeldinger.length > 0 ? <NySykmelding sykmeldinger={sykmeldinger} /> : null}
                    { sykepengesoknader.length > 0 ? <NySykepengesoknad sykepengesoknader={sykepengesoknader} /> : null}
                </ul>
            </div>
        </div>
    </div>);
};

DineOppgaver.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    visOppgaver: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const sykmeldinger = state.dineSykmeldinger.data.filter((s) => {
        return s.status === NY_SYKMELDING;
    });
    const sykepengesoknader = state.sykepengesoknader.data.filter((s) => {
        return s.status === NY_SYKEPENGESOKNAD;
    });
    const visOppgaver = sykmeldinger.length > 0 || sykepengesoknader.length > 0;

    return {
        sykmeldinger,
        sykepengesoknader,
        visOppgaver,
    };
};

const DineOppgaverContainer = connect(mapStateToProps)(DineOppgaver);

export default DineOppgaverContainer;
