import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { inntektskildetyper as inntektskildetypeEnums, sykepengesoknadstatuser, toDatePrettyPrint } from 'digisyfo-npm';
import history from '../../history';
import Feiloppsummering, { onSubmitFail } from '../../containers/FeiloppsummeringContainer';
import { getTidligsteSendtDato, mapAktiviteter } from '../../utils/sykepengesoknadUtils';
import mapBackendsoknadToSkjemasoknad from './/mappers/mapBackendsoknadToSkjemasoknad';
import { SYKEPENGER_SKJEMANAVN } from '../../enums/skjemanavn';

const sendTilFoerDuBegynner = (sykepengesoknad) => {
    history.replace(`/sykefravaer/soknader/${sykepengesoknad.id}`);
};

export const andreInntektskilder = Object.keys(inntektskildetypeEnums).map((key) => {
    return {
        annenInntektskildeType: inntektskildetypeEnums[key],
    };
});


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

const preutfyllSoknad = (soknad, sisteSoknadISammeSykeforlop) => {
    if (!sisteSoknadISammeSykeforlop || soknad.status === sykepengesoknadstatuser.UTKAST_TIL_KORRIGERING) {
        return soknad;
    }

    const bruktEgenmeldingsdagerFoerLegemeldtFravaer = sisteSoknadISammeSykeforlop.egenmeldingsperioder.length > 0;
    const _erPreutfylt = true;
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

    const utdanning = sisteSoknadISammeSykeforlop.utdanning
        ? {
            utdanningStartdato: toDatePrettyPrint(sisteSoknadISammeSykeforlop.utdanning.utdanningStartdato),
            underUtdanningISykmeldingsperioden: true,
            erUtdanningFulltidsstudium: sisteSoknadISammeSykeforlop.utdanning.erUtdanningFulltidsstudium,
        }
        : {
            underUtdanningISykmeldingsperioden: false,
        };

    const harAndreInntektskilder = sisteSoknadISammeSykeforlop.andreInntektskilder
        && sisteSoknadISammeSykeforlop.andreInntektskilder.length > 0;

    const preutfylteInntektskilder = soknad.andreInntektskilder.map((i) => {
        const svarFraForrigeSoknad = sisteSoknadISammeSykeforlop.andreInntektskilder.find((s) => {
            return s.annenInntektskildeType === i.annenInntektskildeType;
        });
        return svarFraForrigeSoknad
            ? {
                ...i,
                avkrysset: true,
                sykmeldt: svarFraForrigeSoknad.sykmeldt,
            }
            : i;
    });

    return bruktEgenmeldingsdagerFoerLegemeldtFravaer
        ? {
            ...soknad,
            utdanning,
            bruktEgenmeldingsdagerFoerLegemeldtFravaer,
            egenmeldingsperioder,
            harAndreInntektskilder,
            andreInntektskilder: preutfylteInntektskilder,
            _erPreutfylt,
        }
        : {
            ...soknad,
            utdanning,
            harAndreInntektskilder,
            andreInntektskilder: preutfylteInntektskilder,
            bruktEgenmeldingsdagerFoerLegemeldtFravaer,
            _erPreutfylt,
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
    const sisteSoknadISammeSykeforlop = getSisteSoknadISammeSykeforloep(soknad, soknader);

    return preutfyllSoknad(initialValues, sisteSoknadISammeSykeforlop);
};

export const getInitialValuesSykepengesoknad = (sykepengesoknad, state) => {
    return sykepengesoknad.status === sykepengesoknadstatuser.UTKAST_TIL_KORRIGERING
        ? mapBackendsoknadToSkjemasoknad(sykepengesoknad)
        : mapToInitialValues(sykepengesoknad, state.sykepengesoknader.data);
};

export const mapStateToPropsMedInitialValues = (state, ownProps) => {
    const { sykepengesoknad } = ownProps;
    const initialValues = getInitialValuesSykepengesoknad(sykepengesoknad, state);
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
