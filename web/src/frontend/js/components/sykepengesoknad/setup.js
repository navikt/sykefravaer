import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { toDatePrettyPrint, inntektskildetyper as inntektskildetypeEnums, sykepengesoknadstatuser } from 'digisyfo-npm';
import history from '../../history';
import Feiloppsummering, { onSubmitFail } from '../../containers/FeiloppsummeringContainer';
import { getTidligsteSendtDato, mapAktiviteter } from '../../utils/sykepengesoknadUtils';
import mapBackendsoknadToSkjemasoknad from '../sykepengesoknad/mappers/mapBackendsoknadToSkjemasoknad';

const sendTilFoerDuBegynner = (sykepengesoknad) => {
    history.replace(`/sykefravaer/soknader/${sykepengesoknad.id}`);
};

export const andreInntektskilder = Object.keys(inntektskildetypeEnums).map((key) => {
    return {
        annenInntektskildeType: inntektskildetypeEnums[key],
    };
});

export const SYKEPENGER_SKJEMANAVN = 'SYKEPENGERSKJEMA';

const getSisteSoknadISammeSykeforloep = (soknad, soknader) => {
    return soknader
        .filter((s) => {
            return s.id !== soknad.id;
        })
        .filter((s) => {
            return s.identdato.getTime() === soknad.identdato.getTime();
        })
        .filter((s) => {
            return s.status === sykepengesoknadstatuser.SENDT || s.status === sykepengesoknadstatuser.TIL_SENDING;
        })
        .filter((s) => {
            return s.arbeidsgiver.orgnummer === soknad.arbeidsgiver.orgnummer;
        })
        .sort((a, b) => {
            return getTidligsteSendtDato(a) - getTidligsteSendtDato(b);
        })[0];
};

const preutfyllEgenmeldingsperioder = (soknad, soknader) => {
    const sisteSoknadISammeSykeforlop = getSisteSoknadISammeSykeforloep({ ...soknad }, soknader);
    if (!sisteSoknadISammeSykeforlop || soknad.status === sykepengesoknadstatuser.UTKAST_TIL_KORRIGERING) {
        return soknad;
    }

    const bruktEgenmeldingsdagerFoerLegemeldtFravaer = sisteSoknadISammeSykeforlop.egenmeldingsperioder.length > 0;
    const _erEgenmeldingsdagerPreutfylt = true;
    const egenmeldingsperioder = [...sisteSoknadISammeSykeforlop.egenmeldingsperioder]
        .sort((periodeA, periodeB) => {
            return periodeA.fom - periodeB.fom;
        })
        .map((periode) => {
            return {
                fom: toDatePrettyPrint(periode.fom),
                tom: toDatePrettyPrint(periode.tom),
            };
        });


    return bruktEgenmeldingsdagerFoerLegemeldtFravaer
        ? {
            ...soknad,
            bruktEgenmeldingsdagerFoerLegemeldtFravaer,
            egenmeldingsperioder,
            _erEgenmeldingsdagerPreutfylt,
        }
        : {
            ...soknad,
            bruktEgenmeldingsdagerFoerLegemeldtFravaer,
            _erEgenmeldingsdagerPreutfylt,
        };
};

export const mapToInitialValues = (soknad, soknader = []) => {
    const aktiviteter = mapAktiviteter(soknad).aktiviteter;
    const initialValues = {
        ...soknad,
        aktiviteter: aktiviteter.map((aktivitet) => {
            return {
                ...aktivitet,
                avvik: {},
            };
        }),
        utdanning: {},
        andreInntektskilder,
        utenlandsopphold: {
            perioder: [],
        },
    };

    return preutfyllEgenmeldingsperioder(initialValues, soknader);
};

export const mapStateToPropsMedInitialValues = (state, ownProps) => {
    const { sykepengesoknad } = ownProps;
    const initialValues = sykepengesoknad.status === sykepengesoknadstatuser.UTKAST_TIL_KORRIGERING
        ? mapBackendsoknadToSkjemasoknad(sykepengesoknad)
        : mapToInitialValues(sykepengesoknad, state.sykepengesoknader.data);
    return {
        initialValues,
        sykepengesoknad: mapAktiviteter(sykepengesoknad),
    };
};

export const mapStateToProps = (state, ownProps) => {
    const { sykepengesoknad } = ownProps;
    return {
        sykepengesoknad: mapAktiviteter(sykepengesoknad),
    };
};

const setup = (validate, Component, initialize = false) => {
    const ComponentMedOppsummering = (props) => {
        return (<div>
            <Feiloppsummering skjemanavn={SYKEPENGER_SKJEMANAVN} />
            <Component {...props} />
        </div>);
    };
    const form = reduxForm({
        form: SYKEPENGER_SKJEMANAVN,
        validate,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        sendTilFoerDuBegynner,
        onSubmitFail: (errors, dispatch) => {
            onSubmitFail(errors, dispatch, SYKEPENGER_SKJEMANAVN);
        },
    })(ComponentMedOppsummering);
    if (initialize) {
        return connect(mapStateToPropsMedInitialValues)(form);
    }
    return connect(mapStateToProps)(form);
};

export default setup;
