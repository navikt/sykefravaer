import React, { Component } from 'react';
import { string, node } from 'prop-types';
import { log } from 'digisyfo-npm';

export default class HotjarTrigger extends Component {
    componentDidMount() {
        if (typeof window.hj === 'function') {
            window.hj('trigger', this.props.hotjarTrigger);
        }
        log(`Trigger hotjar: ${this.props.hotjarTrigger}`);
    }

    render() {
        return this.props.children;
    }
}

HotjarTrigger.propTypes = {
    hotjarTrigger: string.isRequired,
    children: node.isRequired,
};

export const FrilanserSelvstendigKvitteringHotjarTrigger = ({ children }) => {
    return (<HotjarTrigger hotjarTrigger="SELVSTENDIG_FRILANS_JULI_2018">
        {children}
    </HotjarTrigger>);
};

FrilanserSelvstendigKvitteringHotjarTrigger.propTypes = {
    children: node,
};

export const FrilanserSoknadHotjarTrigger = ({ children }) => {
    return (<HotjarTrigger hotjarTrigger="SOKNAD_FRILANSER_NAERINGSDRIVENDE">
        {children}
    </HotjarTrigger>);
};

FrilanserSoknadHotjarTrigger.propTypes = {
    children: node,
};

export const ArbeidstakerSoknadHotjarTrigger = ({ children }) => {
    return (<HotjarTrigger hotjarTrigger="SOKNAD_ARBEIDSTAKER">
        {children}
    </HotjarTrigger>);
};

ArbeidstakerSoknadHotjarTrigger.propTypes = {
    children: node,
};
