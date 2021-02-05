import React, { Component, createRef } from 'react';
import {
    Bjorn, DineSykmeldingOpplysninger, getLedetekst, scrollTo,
} from '@navikt/digisyfo-npm';
import DinSykmeldingSkjemaContainer from './sykmelding-skjema/skjema/DinSykmeldingSkjemaContainer';
import Sidetopp from '../../components/Sidetopp';
import { getSykmeldtFornavn } from '../../utils/sykmeldingUtils';
import SykmeldingContext from '../contexts/SykmeldingContext';
import EldreSykmeldingVarsel from '../eldre-sykmelding-varsel/EldreSykmeldingVarsel';
import { NySykmeldingTrigger } from '../../components/HotjarTrigger';
import PapirsykmeldingPanel from './PapirsykmeldingPanel';
import MerknadBanner, { harMerknad } from './MerknadBanner';

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
                                <Sidetopp tittel={
                                    harMerknad(sykmelding, 'UGYLDIG_TILBAKEDATERING') || harMerknad(sykmelding, 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER')
                                        ? 'Tilbakedatert sykmelding'
                                        : 'Sykmelding'} />
                                <EldreSykmeldingVarsel sykmelding={sykmelding} />

                                <MerknadBanner sykmelding={sykmelding} skjemaRef={this.skjemaRef} />

                                { sykmelding.erPapirsykmelding
                                    && <PapirsykmeldingPanel sykmelding={sykmelding} skjemaRef={this.skjemaRef} />
                                }

                                { !sykmelding.erPapirsykmelding && !harMerknad(sykmelding, 'UGYLDIG_TILBAKEDATERING') && !harMerknad(sykmelding, 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER')
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
