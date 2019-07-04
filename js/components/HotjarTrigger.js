/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import { string, node } from 'prop-types';
import { log } from '@navikt/digisyfo-npm';

export default class HotjarTrigger extends Component {
    componentDidMount() {
        const { hotjarTrigger } = this.props;
        if (typeof window.hj === 'function'
            && window.location.href.indexOf('herokuapp') === -1) {
            window.hj('trigger', hotjarTrigger);
        }
        log(`Trigger hotjar: ${hotjarTrigger}`);
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

HotjarTrigger.propTypes = {
    hotjarTrigger: string.isRequired,
    children: node.isRequired,
};

export const FrilanserSelvstendigKvitteringHotjarTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SELVSTENDIG_FRILANS_JULI_2018">
        {children}
    </HotjarTrigger>
);

FrilanserSelvstendigKvitteringHotjarTrigger.propTypes = {
    children: node,
};

export const FrilanserSoknadHotjarTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SOKNAD_FRILANSER_NAERINGSDRIVENDE">
        {children}
    </HotjarTrigger>
);

FrilanserSoknadHotjarTrigger.propTypes = {
    children: node,
};

export const ArbeidstakerSoknadHotjarTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SOKNAD_ARBEIDSTAKER">
        {children}
    </HotjarTrigger>
);

ArbeidstakerSoknadHotjarTrigger.propTypes = {
    children: node,
};

export const NyArbeidstakerSoknadHotjarTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SOKNAD_ARBEIDSTAKER_NY">
        {children}
    </HotjarTrigger>
);

NyArbeidstakerSoknadHotjarTrigger.propTypes = {
    children: node,
};

export const SykepengerUtlandSoknadTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SOKNAD_OPPHOLD_UTENFOR_NORGE">
        {children}
    </HotjarTrigger>
);

SykepengerUtlandSoknadTrigger.propTypes = {
    children: node,
};

export const NySykmeldingTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SYKMELDING_NY">
        {children}
    </HotjarTrigger>
);

NySykmeldingTrigger.propTypes = {
    children: node,
};

export const AvvistSykmeldingTrigger = ({ children }) => (
    <HotjarTrigger hotjarTrigger="SYKMELDING_AVVIST">
        {children}
    </HotjarTrigger>
);

AvvistSykmeldingTrigger.propTypes = {
    children: node,
};
