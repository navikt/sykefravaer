import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    Video,
    Bjorn,
    tilLesbarDatoMedArstall,
} from '../../../digisyfoNpm';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { soknadsdatoremseUtenForsteDato, sorterSoknaderEtterDatoTilgjengelig } from '../felles/Soknadsdatoliste';
import { soknadPt } from '../../../propTypes';
import { SOKNAD_SYKEPENGER } from '../../../enums/filmer';

const SokOmSykepengerSenereKvittering = ({
    fremtidigeSoknader, sykmeldingstype = 'lang', forskutteringstype = 'arbeidsgiver-forskutterer',
}) => {
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
                                '%DATO%': tilLesbarDatoMedArstall(sorterSoknaderEtterDatoTilgjengelig(fremtidigeSoknader)[0].tom),
                                '%DATOER%': soknadsdatoremseUtenForsteDato(fremtidigeSoknader),
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
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
    sykmeldingstype: PropTypes.oneOf(['lang', 'kort']),
    forskutteringstype: PropTypes.oneOf(['arbeidsgiver-forskutterer', 'arbeidsgiver-forskutterer-ikke']),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding = ({ fremtidigeSoknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            fremtidigeSoknader={fremtidigeSoknader} />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererLangSykmelding.propTypes = {
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding = ({ fremtidigeSoknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            fremtidigeSoknader={fremtidigeSoknader}
            sykmeldingstype="kort" />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererKortSykmelding.propTypes = {
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding = ({ fremtidigeSoknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            fremtidigeSoknader={fremtidigeSoknader}
            forskutteringstype="arbeidsgiver-forskutterer-ikke" />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeLangSykmelding.propTypes = {
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding = ({ fremtidigeSoknader }) => {
    return (
        <SokOmSykepengerSenereKvittering
            fremtidigeSoknader={fremtidigeSoknader}
            sykmeldingstype="kort"
            forskutteringstype="arbeidsgiver-forskutterer-ikke" />
    );
};

SokOmSykepengerSenereKvitteringArbeidsgiverForskuttererIkkeKortSykmelding.propTypes = {
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
};
