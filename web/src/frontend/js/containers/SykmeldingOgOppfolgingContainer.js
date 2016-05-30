import React, { PropTypes } from 'react';
import SykmeldingOgOppfolging from '../components/SykmeldingOgOppfolging.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import { getLedetekst } from '../ledetekster';

export const SykmeldingOgOppfolgingSide = (props) => {
    const { ledetekster, brodsmuler, skjulVarsel } = props;
    return (
        <Side tittel={getLedetekst('sykmelding-og-oppfolging.sidetittel', ledetekster.data)} brodsmuler={brodsmuler}>
            <SykmeldingOgOppfolging skjulVarsel={skjulVarsel} ledetekster={ledetekster.data}/>
        </Side>
    );
};

SykmeldingOgOppfolgingSide.propTypes = {
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    skjulVarsel: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        skjulVarsel: state.brukerinfo.data.skjulUnderUtviklingVarsel === true,
        brodsmuler: [{
            tittel: 'Sykmeldinger og oppfølging',
            sti: '/',
        }],
    };
}

const SykmeldingOgOppfolgingContainer = connect(mapStateToProps)(SykmeldingOgOppfolgingSide);

export default SykmeldingOgOppfolgingContainer;
