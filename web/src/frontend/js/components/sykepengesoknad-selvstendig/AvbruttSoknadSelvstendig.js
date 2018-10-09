import React from 'react';
import { connect } from 'react-redux';
import { getLedetekst, sykmelding as sykmeldingPt, tilLesbarDatoMedArstall } from 'digisyfo-npm';
import { soknad as soknadPt } from '../../propTypes';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import Soknadtopp from './Soknadtopp';
import SykmeldingUtdragForSelvstendige from './SykmeldingUtdragForSelvstendige';

const AvbruttSoknadSelvstendigStatuspanel = ({ soknad }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{getLedetekst('sykepengesoknad.status.AVBRUTT')}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel="Dato avbrutt">
                <p>
                    {tilLesbarDatoMedArstall(soknad.avbruttDato)}
                </p>
            </StatusNokkelopplysning>
        </Statusopplysninger>
    </Statuspanel>);
};

AvbruttSoknadSelvstendigStatuspanel.propTypes = {
    soknad: soknadPt,
};

const AvbruttSoknadSelvstendig = ({ soknad, sykmelding }) => {
    return (<div>
        <Soknadtopp soknad={soknad} />
        <AvbruttSoknadSelvstendigStatuspanel soknad={soknad} />
        <SykmeldingUtdragForSelvstendige sykmelding={sykmelding} erApen />
    </div>);
};

AvbruttSoknadSelvstendig.propTypes = {
    soknad: soknadPt,
    sykmelding: sykmeldingPt,
};

const mapStateToProps = (state, { soknad }) => {
    return {
        sykmelding: state.dineSykmeldinger.data.find((sykmld) => {
            return sykmld.id === soknad.sykmeldingId;
        }),
    };
};

export default connect(mapStateToProps)(AvbruttSoknadSelvstendig);
