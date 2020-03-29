/* eslint-disable max-len */
import React, { Component } from 'react';
import {
    DineKoronaSykmeldingOpplysninger,
} from '@navikt/digisyfo-npm';
import { Undertittel, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import SykmeldingContext from '../contexts/SykmeldingContext';
import { NySykmeldingTrigger } from '../../components/HotjarTrigger';
import KoronaSkjema from './skjema/Koronaskjema';

class KoronaSykmeldingNy extends Component {
    render() {
        return (
            <SykmeldingContext.Consumer>
                {({ sykmelding }) => {
                    return (
                        <NySykmeldingTrigger>
                            <Sidetittel style={{ marginBottom: '1rem', textAlign: 'center' }}>Egenmelding</Sidetittel>
                            <Undertittel style={{ marginBottom: '2.5rem', textAlign: 'center' }}>for selvstendig næringsdrivende og frilansere</Undertittel>
                            <Normaltekst style={{ marginBottom: '1rem' }}>Her sjekker du at opplysningene fra da du opprettet egenmeldingen stemmer. Om alt stemmer kan du bekrefte og sende inn egenmeldingen.</Normaltekst>
                            <Normaltekst style={{ marginBottom: '2rem' }}>Vennligst se nøye over og påse at opplysningene du har oppgitt er riktige.</Normaltekst>
                            <article>
                                <header className="panelHeader panelHeader--lysebla">
                                    <img
                                        className="panelHeader__ikon"
                                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/person.svg`}
                                        alt="Du"
                                    />
                                    <h2 className="panelHeader__tittel">
                                        {sykmelding.pasient.fornavn}
                                        {' '}
                                        {sykmelding.pasient.mellomnavn}
                                        {' '}
                                        {sykmelding.pasient.etternavn}
                                    </h2>
                                </header>
                                <div className="panel blokk">
                                    <DineKoronaSykmeldingOpplysninger sykmelding={sykmelding} />
                                </div>
                            </article>
                            <div
                                ref={(c) => {
                                    this.skjema = c;
                                }}
                                tabIndex="-1"
                                className="sykmeldingskjemaRef"
                            >
                                <KoronaSkjema sykmelding={sykmelding} />
                            </div>
                        </NySykmeldingTrigger>
                    );
                }}
            </SykmeldingContext.Consumer>
        );
    }
}

export default KoronaSykmeldingNy;
