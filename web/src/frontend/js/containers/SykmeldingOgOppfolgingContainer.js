import React, { PropTypes } from 'react';
import SykmeldingOgOppfolging from '../components/SykmeldingOgOppfolging.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import { getLedetekst } from '../ledetekster';
import { sorterSykmeldinger } from '../utils';

export const SykmeldingOgOppfolgingSide = (props) => {
    return (<Side tittel={getLedetekst('sykmeldingOgOppfolging.sidetittel', props.ledetekster.data)} brodsmuler={props.brodsmuler}>
        {
            (() => {
                return (<SykmeldingOgOppfolging
                    skjulVarsel={props.skjulVarsel}
                    ledetekster={props.ledetekster.data} />);
            })()
        }
    </Side>);
};

SykmeldingOgOppfolging.propTypes = {
    props: PropTypes.object,
    ledetekster: PropTypes.object,
    brodsmuler: PropTypes.array,
    sykmeldinger: PropTypes.object,
    skjulVarsel: PropTypes.bool
};

export function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
        skjulVarsel: state.brukerinfo.data.skjulUnderUtviklingVarsel === true,
        brodsmuler: [{
            tittel: 'Sykmeldinger og oppfølging',
            sti: '/'
        }]
    };
}

const SykmeldingOgOppfolgingContainer = connect(mapStateToProps)(SykmeldingOgOppfolgingSide);

export default SykmeldingOgOppfolgingContainer;
