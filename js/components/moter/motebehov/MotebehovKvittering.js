import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
    Utvidbar,
} from 'digisyfo-npm';
import { proptypes as motebehovProptypes } from 'moter-npm';
import { FELTER } from './SvarMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../utils/datoUtils';

export const MotebehovKvitteringUtvidbarAT = (
    {
        ledetekster,
        motebehov,
    }) => {
    const motebehovSvar = motebehov.motebehovSvar;
    return (<Utvidbar
        className="motebehovKvitteringUtvidbar"
        tittel={getLedetekst('mote.moteBehovKvitteringUtvidbar.tittel', ledetekster)}>
        <div>
            { motebehov.opprettetDato &&
                <h4>{tilLesbarDatoMedArstallOgUkedag(motebehov.opprettetDato)}</h4>
            }

            { motebehovSvar.harMotebehov !== undefined && [
                <label key={0}>{FELTER.harMotebehov.spoersmaal}</label>,
                <p key={1}>
                    {`${motebehovSvar.harMotebehov ?
                        FELTER.harMotebehov.svar[0].tekst
                        :
                        FELTER.harMotebehov.svar[1].tekst
                    }`}
                </p>,
            ]}

            { motebehovSvar.forklaring && [
                <label key={0}>{FELTER.forklaring.spoersmaal}</label>,
                <p key={1}>{motebehovSvar.forklaring}</p>,
            ]}
        </div>
    </Utvidbar>);
};
MotebehovKvitteringUtvidbarAT.propTypes = {
    ledetekster: keyValue,
    motebehov: motebehovProptypes.motebehovPt,
};

const MotebehovKvittering = (
    {
        ledetekster,
        motebehov,
        rootUrlImg,
    }) => {
    return (<div className="panel motebehovKvittering">
        <div className="illustrertTittel">
            <img
                className="illustrertTittel__img"
                src={`${rootUrlImg}/img/svg/hake-groenn--lys.svg`}
                alt="hake"
            />
            <h2 className="illustrertTittel__tittel">
                {getLedetekst('mote.moteBehovKvittering.tittel', ledetekster)}
            </h2>
        </div>

        <p>{getLedetekst('mote.moteBehovKvittering.tekst', ledetekster)}</p>

        <MotebehovKvitteringUtvidbarAT
            ledetekster={ledetekster}
            motebehov={motebehov}
        />
    </div>);
};
MotebehovKvittering.propTypes = {
    ledetekster: keyValue,
    motebehov: motebehovProptypes.motebehovPt,
    rootUrlImg: PropTypes.string,
};

export default MotebehovKvittering;
