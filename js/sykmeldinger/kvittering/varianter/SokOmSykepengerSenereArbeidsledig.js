import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    Bjorn,
} from '../../../digisyfoNpm';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';

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

export const SokOmSykepengerSenereArbeidsledigLangSykmelding = () => {
    return (
        <SokOmSykepengerSenereArbeidsledig
        />
    );
};

SokOmSykepengerSenereArbeidsledigLangSykmelding.propTypes = {

};

export const SokOmSykepengerSenereArbeidsledigKortSykmelding = () => {
    return (
        <SokOmSykepengerSenereArbeidsledig
            sykmeldingstype="kort"
        />
    );
};

SokOmSykepengerSenereArbeidsledigKortSykmelding.propTypes = {

};
