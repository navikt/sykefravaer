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

class NySykmelding extends Component {
    constructor() {
        super();
        this.skjemaRef = createRef(document.createElement('div'));
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
                                <PapirsykmeldingPanel skjemaRef={this.skjemaRef} />
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
