import Side from '../sider/Side.js';
import SendSykmeldingKvittering from '../components/SendSykmeldingKvittering.js';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from '../ledetekster';
import AppSpinner from '../components/AppSpinner.js';
import Feilmelding from '../components/Feilmelding.js';

export const SendSykmeldingKvitteringSide = (props) => {
    const { ledetekster, sykmelding, brodsmuler } = props;
    return (
        <Side tittel="Kvittering" brodsmuler={brodsmuler}>
            {
                (() => {
                    if (sykmelding.henter) {
                        return <AppSpinner />;
                    } else if (sykmelding.hentingFeilet) {
                        return (<Feilmelding />);
                    }
                    return <SendSykmeldingKvittering ledetekster={ledetekster} sykmelding={sykmelding} />;
                })()
            }

        </Side>
    );
};

SendSykmeldingKvitteringSide.propTypes = {
    brodsmuler: PropTypes.array,
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const sykmelding = state.dineSykmeldinger.data.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];

    return {
        sykmelding: {
            data: sykmelding,
            hentingFeilet: state.dineSykmeldinger.hentingFeilet,
            henter: state.dineSykmeldinger.henter,
        },
        ledetekster: state.ledetekster,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel', state.ledetekster.data),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('dine-sykmeldinger.sidetittel', state.ledetekster.data),
            sti: '/sykmeldinger',
            erKlikkbar: true,
        }, {
            tittel: 'kvittering',
        }],
    };
}

const SendSykmeldingKvitteringContainer = connect(mapStateToProps)(SendSykmeldingKvitteringSide);

export default SendSykmeldingKvitteringContainer;
