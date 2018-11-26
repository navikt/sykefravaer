import React from 'react';
import {
    sykepengesoknad as sykepengesoknadPt,
    getLedetekst,
    Video,
    filmer,
    Bjorn,
    tilLesbarDatoMedArstall,
} from 'digisyfo-npm';
import PropTypes from 'prop-types';
import getContextRoot from '../../utils/getContextRoot';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from './Kvitteringsteg';
import { sorterSoknaderEtterDatoTilgjengelig } from './Soknadsdatoliste';

const SokOmSykepengerSenereKvittering = ({ sykepengesoknader, sykmeldingstype = 'lang', forskutteringstype = 'arbeidsgiver-forskutterer' }) => {
    return (<div className="js-kvittering js-kvittering--sok-senere">
        <div className="panel blokk">
            <StegvisKvittering>
                <Kvitteringsteg
                    nummer="1"
                    ok
                    tittel={getLedetekst(`sykmelding.kvittering.sok-senere.steg-1.${forskutteringstype}.${sykmeldingstype}-sykmelding.tittel`)}>
                    <HtmlAvsnitt
                        Tag="div"
                        nokkel={`sykmelding.kvittering.sok-senere.steg-1.${forskutteringstype}.${sykmeldingstype}-sykmelding.undertekst`} />
                </Kvitteringsteg>
                <Kvitteringsteg
                    nummer="2"
                    tittel={getLedetekst(`sykmelding.kvittering.sok-senere.steg-2.${forskutteringstype}.${sykmeldingstype}-sykmelding.tittel`)}>
                    <HtmlAvsnitt
                        nokkel={`sykmelding.kvittering.sok-senere.steg-2.${forskutteringstype}.${sykmeldingstype}-sykmelding.undertekst`}
                        replacements={{
                            '%DATO%': tilLesbarDatoMedArstall(sorterSoknaderEtterDatoTilgjengelig(sykepengesoknader)[0].tom),
                        }} />
                </Kvitteringsteg>
            </StegvisKvittering>
        </div>
        <Bjorn
            className="blokk"
            hvit
            stor
            nokkel="sykmelding.kvittering.sok-senere.bjorn"
            rootUrl={getContextRoot()} />
        <div className="blokk">
            <h2 className="panel__tittel blokk--xxs">{getLedetekst('sykmelding.kvittering.sok-senere.video.tittel')}</h2>
            <Video film={filmer.SOKNAD_SYKEPENGER} />
        </div>
    </div>);
};

SokOmSykepengerSenereKvittering.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    sykmeldingstype: PropTypes.oneOf(['lang', 'kort']),
    forskutteringstype: PropTypes.oneOf(['arbeidsgiver-forskutterer', 'arbeidsgiver-forskutterer-ikke']),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding = ({ sykepengesoknader }) => {
    return <SokOmSykepengerSenereKvittering sykepengesoknader={sykepengesoknader} />;
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding = ({ sykepengesoknader }) => {
    return <SokOmSykepengerSenereKvittering sykepengesoknader={sykepengesoknader} sykmeldingstype="kort" />;
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding = ({ sykepengesoknader }) => {
    return <SokOmSykepengerSenereKvittering sykepengesoknader={sykepengesoknader} forskutteringstype="arbeidsgiver-forskutterer-ikke" />;
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding = ({ sykepengesoknader }) => {
    return <SokOmSykepengerSenereKvittering sykepengesoknader={sykepengesoknader} sykmeldingstype="kort" forskutteringstype="arbeidsgiver-forskutterer-ikke" />;
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};
