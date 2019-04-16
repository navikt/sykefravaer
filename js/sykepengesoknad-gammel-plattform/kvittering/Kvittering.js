import React, { Component } from 'react';
import { erSynligIViewport, getHtmlLedetekst, getLedetekst, scrollTo } from '@navikt/digisyfo-npm';
import Sidetopp from '../../components/Sidetopp';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';
import { getSendtTilSuffix } from '../utils/sykepengesoknadUtils';
import { LenkeTilSoknader } from '../../sykepengesoknad/felleskomponenter/LenkeTilSoknader';

class Kvittering extends Component {
    componentDidMount() {
        const el = this.kvittering;
        if (!erSynligIViewport(el)) {
            scrollTo(el, 200);
        }
    }

    render() {
        const { sykepengesoknad } = this.props;
        return (<div ref={(c) => {
            this.kvittering = c;
        }}>
            <Sidetopp tittel="Kvittering" />
            <div className="panel blokk js-kvittering">
                <div className="hode hode--suksess">
                    <h2 className="hode__tittel">{getLedetekst(`sykepengesoknad.kvittering${getSendtTilSuffix(sykepengesoknad)}.tittel`)}</h2>
                    <div
                        className="redaksjonelt-innhold"
                        dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.kvittering${getSendtTilSuffix(sykepengesoknad)}.tekst`, {
                            '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver ? sykepengesoknad.arbeidsgiver.navn : '',
                        })} />
                </div>
            </div>
            <p className="ikke-print blokk navigasjonsstripe">
                <LenkeTilSoknader />
            </p>
        </div>);
    }
}

Kvittering.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
};

export default Kvittering;
