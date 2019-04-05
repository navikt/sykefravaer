import React, { Component } from 'react';
import { Bjorn, DineSykmeldingOpplysninger, getLedetekst, scrollTo } from '@navikt/digisyfo-npm';
import DinSykmeldingSkjemaContainer from './sykmelding-skjema/skjema/DinSykmeldingSkjemaContainer';
import Sidetopp from '../../components/Sidetopp';
import { getSykmeldtFornavn } from '../../utils/sykmeldingUtils';
import SykmeldingContext from '../contexts/SykmeldingContext';
import EldreSykmeldingVarsel from '../eldre-sykmelding-varsel/EldreSykmeldingVarsel';

class NySykmelding extends Component {
    render() {
        return (<SykmeldingContext.Consumer>
            {
                ({ sykmelding }) => {
                    return (<React.Fragment>
                        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
                        <EldreSykmeldingVarsel sykmelding={sykmelding} />
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollTo(this.skjema);
                                            this.skjema.focus();
                                        }}
                                        className="knapp knapp--mini">Gå til utfyllingen</button>
                                </p>
                            </div>
                        </Bjorn>
                        <article>
                            <header className="panelHeader panelHeader--lysebla">
                                <img className="panelHeader__ikon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/person.svg`} alt="Du" />
                                <h2 className="panelHeader__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.mellomnavn} {sykmelding.pasient.etternavn}</h2>
                            </header>
                            <div className="panel blokk">
                                <DineSykmeldingOpplysninger sykmelding={sykmelding} />
                            </div>
                        </article>
                        <div
                            ref={(c) => {
                                this.skjema = c;
                            }}
                            tabIndex="-1"
                            className="sykmeldingskjemaRef">
                            <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
                        </div>
                    </React.Fragment>);
                }
            }
        </SykmeldingContext.Consumer>);
    }
}

export default NySykmelding;
