import React, { Component } from 'react';
import { Bjorn, DineSykmeldingOpplysninger, getLedetekst, scrollTo } from 'digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import DinSykmeldingSkjemaContainer from '../../containers/sykmelding/DinSykmeldingSkjemaContainer';
import Sidetopp from '../Sidetopp';
import { getSykmeldtFornavn } from '../../utils/sykmeldingUtils';
import SykmeldingContext from '../../contexts/SykmeldingContext';
import EldreSykmeldingVarsel from './EldreSykmeldingVarsel';

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
                            stor
                            rootUrl={getContextRoot()}>
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
                                        className="knapp knapp--mini">Gå til utfylling</button>
                                </p>
                            </div>
                        </Bjorn>
                        <article>
                            <header className="panelHeader panelHeader--lysebla">
                                <img className="panelHeader__ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
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
