import React, { Component, createRef } from 'react';
import {
    Bjorn, DineSykmeldingOpplysninger, getLedetekst, scrollTo,
} from '@navikt/digisyfo-npm';
import Veilederpanel from 'nav-frontend-veilederpanel';
import DinSykmeldingSkjemaContainer from './sykmelding-skjema/skjema/DinSykmeldingSkjemaContainer';
import Sidetopp from '../../components/Sidetopp';
import { getSykmeldtFornavn } from '../../utils/sykmeldingUtils';
import SykmeldingContext from '../contexts/SykmeldingContext';
import EldreSykmeldingVarsel from '../eldre-sykmelding-varsel/EldreSykmeldingVarsel';
import { NySykmeldingTrigger } from '../../components/HotjarTrigger';
import PapirsykmeldingPanel from './PapirsykmeldingPanel';
import MannNoytral from '../../components/svg/MannNoytral';

const harMerknad = (sykmelding, merknadType) => { return sykmelding.merknad && sykmelding.merknad.some((merknad) => { return merknad.type === merknadType; }); };

/* eslint-disable max-len */
class NySykmelding extends Component {
    constructor() {
        super();
        this.skjemaRef = createRef();
    }

    render() {
        return (
            <SykmeldingContext.Consumer>
                {
                    ({ sykmelding }) => {
                        return (
                            <NySykmeldingTrigger>
                                <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
                                <EldreSykmeldingVarsel sykmelding={sykmelding} />

                                { harMerknad(sykmelding, 'UGYLDIG_TILBAKEDATERING')
                                    && (
                                        <div style={{ paddingTop: '1rem', marginBottom: '2rem' }}>
                                            <Veilederpanel
                                                fargetema="advarsel"
                                                type="plakat"
                                                center
                                                kompakt
                                                svg={<MannNoytral />}
                                            >
                                                <h2>
                                                Tilbakedateringen kan ikke godkjennes
                                                </h2>
                                                <p>
                                                Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for tilbakedateringen.
                                                </p>
                                                <p>
                                                Sykmeldingen din er datert til før du oppsøkte behandleren, og det er ikke oppgitt noen gyldig grunn. Derfor vil du ikke få sykepenger for disse dagene.
                                                </p>
                                                <h2>
                                                Hva gjør jeg nå?
                                                </h2>
                                                <p>
                                                Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger. Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de dagene, og du får samtidig mulighet til å klage.
                                                </p>
                                            </Veilederpanel>
                                        </div>
                                    )
                                }

                                { sykmelding.erPapirsykmelding
                                    && <PapirsykmeldingPanel sykmelding={sykmelding} skjemaRef={this.skjemaRef} />
                                }

                                { !sykmelding.erPapirsykmelding && !harMerknad(sykmelding, 'UGYLDIG_TILBAKEDATERING')
                                    && (
                                        <Bjorn
                                            className="blokk"
                                            hvit
                                            stor>
                                            <div>
                                                <p>
                                                    {
                                                        getLedetekst('din-sykmelding.introtekst.bjorn', {
                                                            '%NAVN%': getSykmeldtFornavn(sykmelding),
                                                        })
                                                    }
                                                </p>
                                                <p className="introtekst__knapperad">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollTo(this.skjemaRef.current);
                                                            this.skjemaRef.current.focus();
                                                        }}
                                                        className="knapp knapp--mini"
                                                    >
                                            Gå til utfyllingen
                                                    </button>
                                                </p>
                                            </div>
                                        </Bjorn>
                                    )
                                }

                                <article>
                                    <header className="panelHeader panelHeader--lysebla">
                                        <img className="panelHeader__ikon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/person.svg`} alt="Du" />
                                        <h2 className="panelHeader__tittel">
                                            {sykmelding.pasient.fornavn}
                                            {' '}
                                            {sykmelding.pasient.mellomnavn}
                                            {' '}
                                            {sykmelding.pasient.etternavn}
                                        </h2>
                                    </header>
                                    <div className="panel blokk">
                                        <DineSykmeldingOpplysninger sykmelding={sykmelding} />
                                    </div>
                                </article>
                                <div
                                    ref={this.skjemaRef}
                                    tabIndex="-1"
                                    className="sykmeldingskjemaRef">
                                    <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
                                </div>
                            </NySykmeldingTrigger>
                        );
                    }
                }
            </SykmeldingContext.Consumer>
        );
    }
}

export default NySykmelding;
