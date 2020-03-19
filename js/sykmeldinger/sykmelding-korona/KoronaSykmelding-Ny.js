import React, { Component } from 'react';
import {
    Bjorn,
    DineKoronaSykmeldingOpplysninger,
    scrollTo,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import DinSykmeldingSkjemaContainer from './sykmelding-skjema/skjema/DinSykmeldingSkjemaContainer';
import Sidetopp from '../../components/Sidetopp';
import SykmeldingContext from '../contexts/SykmeldingContext';
import { NySykmeldingTrigger } from '../../components/HotjarTrigger';

class KoronaSykmelding extends Component {
    render() {
        return (
            <SykmeldingContext.Consumer>
                {({ sykmelding }) => {
                    return (
                        <NySykmeldingTrigger>
                            <Sidetopp tittel="14-dagers egenerklæring" />
                            <h3 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{`Opprettet ${tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato)}`}</h3>
                            <Bjorn className="blokk" hvit stor>
                                <div>
                                    <p>
                    Hei, nedenfor ser du en oppsummering av informasjonen du
                    fylte inn når du opprettet egenerklæringen. Vennligst se over
                    at informasjonen stemmer og send inn/bekreft egenerklæringen.
                                    </p>
                                    <p className="introtekst__knapperad">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollTo(this.skjema);
                                                this.skjema.focus();
                                            }}
                                            className="knapp knapp--mini"
                                        >
                      Gå til utfyllingen
                                        </button>
                                    </p>
                                </div>
                            </Bjorn>
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
                                <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
                            </div>
                        </NySykmeldingTrigger>
                    );
                }}
            </SykmeldingContext.Consumer>
        );
    }
}

export default KoronaSykmelding;
