import React from 'react';
import {
    sykepengesoknad as sykepengesoknadPt,
    getLedetekst,
    Video,
    Bjorn,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { soknadsdatoremseUtenForsteDato, sorterSoknaderEtterDatoTilgjengelig } from '../felles/Soknadsdatoliste';
import { soknadPt } from '../../../propTypes/soknadProptype';
import { SOKNAD_SYKEPENGER } from '../../../enums/filmer';

const SokOmSykepengerSenereKvittering = ({
    sykepengesoknader, soknader, sykmeldingstype = 'lang', forskutteringstype = 'arbeidsgiver-forskutterer',
}) => {
    const soknaderOgSykepengesoknader = [...sykepengesoknader, ...soknader];
    return (
        <div className="js-kvittering js-kvittering--sok-senere">
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
                                '%DATO%': tilLesbarDatoMedArstall(sorterSoknaderEtterDatoTilgjengelig(soknaderOgSykepengesoknader)[0].tom),
                                '%DATOER%': soknadsdatoremseUtenForsteDato(soknaderOgSykepengesoknader),
                            }} />
                    </Kvitteringsteg>
                </StegvisKvittering>
            </div>
            <Bjorn
                className="blokk"
                hvit
                stor
                nokkel="sykmelding.kvittering.sok-senere.bjorn" />
            <div className="blokk">
                <h2 className="panel__tittel blokk--xxs">{getLedetekst('sykmelding.kvittering.sok-senere.video.tittel')}</h2>
                <Video film={SOKNAD_SYKEPENGER} />
            </div>
        </div>
    );
};

SokOmSykepengerSenereKvittering.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
    sykmeldingstype: PropTypes.oneOf(['lang', 'kort']),
    forskutteringstype: PropTypes.oneOf(['arbeidsgiver-forskutterer', 'arbeidsgiver-forskutterer-ikke']),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding = ({ sykepengesoknader, soknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            soknader={soknader}
            sykepengesoknader={sykepengesoknader} />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding = ({ sykepengesoknader, soknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            soknader={soknader}
            sykepengesoknader={sykepengesoknader}
            sykmeldingstype="kort" />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding = ({ sykepengesoknader, soknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            sykepengesoknader={sykepengesoknader}
            soknader={soknader}
            forskutteringstype="arbeidsgiver-forskutterer-ikke" />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding = ({ sykepengesoknader, soknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            sykepengesoknader={sykepengesoknader}
            soknader={soknader}
            sykmeldingstype="kort"
            forskutteringstype="arbeidsgiver-forskutterer-ikke" />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};
