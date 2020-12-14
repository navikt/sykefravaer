import React from 'react';
import {
    sykepengesoknad as sykepengesoknadPt,
    getLedetekst,
    Bjorn,
} from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { soknadPt } from '../../../propTypes/soknadProptype';

const SokOmSykepengerSenereArbeidsledig = ({ sykmeldingstype = 'lang' }) => {
    return (
        <div className="js-kvittering js-kvittering--sok-senere">
            <div className="panel blokk">
                <StegvisKvittering>
                    <Kvitteringsteg
                        nummer="1"
                        ok
                        tittel={getLedetekst(`sykmelding.kvittering.sok-senere.steg-1.arbeidsledig.${sykmeldingstype}-sykmelding.tittel`)}>
                        <HtmlAvsnitt
                            Tag="div"
                            nokkel={`sykmelding.kvittering.sok-senere.steg-1.arbeidsledig.${sykmeldingstype}-sykmelding.undertekst`}
                        />
                    </Kvitteringsteg>
                    <Kvitteringsteg
                        nummer="2"
                        tittel={getLedetekst(`sykmelding.kvittering.sok-senere.steg-2.arbeidsledig.${sykmeldingstype}-sykmelding.tittel`)}>
                        <HtmlAvsnitt
                            nokkel={`sykmelding.kvittering.sok-senere.steg-2.arbeidsledig.${sykmeldingstype}-sykmelding.undertekst`}
                        />
                        <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.arbeidsledig.papir.tekst" />
                    </Kvitteringsteg>
                </StegvisKvittering>
            </div>
            <Bjorn
                className="blokk"
                hvit
                stor
                nokkel="sykmelding.kvittering.sok-senere.bjorn"
            />
        </div>
    );
};

SokOmSykepengerSenereArbeidsledig.propTypes = {
    sykmeldingstype: PropTypes.oneOf(['lang', 'kort']),
};

export const SokOmSykepengerSenereArbeidsledigLangSykmelding = ({ sykepengesoknader, soknader }) => {
    return (
        <SokOmSykepengerSenereArbeidsledig
            soknader={soknader}
            sykepengesoknader={sykepengesoknader}
        />
    );
};

SokOmSykepengerSenereArbeidsledigLangSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};

export const SokOmSykepengerSenereArbeidsledigKortSykmelding = ({ sykepengesoknader, soknader }) => {
    return (
        <SokOmSykepengerSenereArbeidsledig
            soknader={soknader}
            sykepengesoknader={sykepengesoknader}
            sykmeldingstype="kort"
        />
    );
};

SokOmSykepengerSenereArbeidsledigKortSykmelding.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
};
