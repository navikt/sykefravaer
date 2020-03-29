import React, { Component } from 'react';
import {
    Bjorn,
    DineKoronaSykmeldingOpplysninger,
    scrollTo,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import Sidetopp from '../../components/Sidetopp';
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
                            <Sidetopp tittel="Koronamelding" />
                            <h3
                                style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                            >
                                {`Opprettet ${tilLesbarDatoMedArstall(
                                    sykmelding.bekreftelse.utstedelsesdato,
                                )}`}

                            </h3>
                            <Bjorn className="blokk" hvit stor>
                                <div>
                                    <p>
                    Hei, her sjekker du at opplysningene fra opprettingsskjemaet
                    stemmer. Om alt stemmer kan du bekrefte og sende inn
                    egenmeldingen.
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
