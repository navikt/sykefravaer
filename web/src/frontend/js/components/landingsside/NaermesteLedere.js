import React, { Component, PropTypes } from 'react';
import Lightbox from '../Lightbox';
import BekreftFeilLederContainer from '../../containers/BekreftFeilLederContainer';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';
import { getLedetekst } from 'digisyfo-npm';

export default class NaermesteLedere extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visLightbox: false,
        };
    }

    apneLightbox(leder) {
        this.setState({
            visLightbox: true,
            leder,
        });
    }

    lukkLightbox() {
        const knapp = this.refs[`js-leder-${this.state.leder.orgnummer}`];
        if (knapp) {
            knapp.focus();
        }
        this.setState({
            visLightbox: false,
            leder: undefined,
        });
    }

    render() {
        const { ledere } = this.props;
        return (<div className="situasjon">
            <div className="situasjon__ikon">
                <img src="/sykefravaer/img/svg/arbeidsgiver.svg" alt="Arbeidsgiver" />
            </div>
            {this.state.visLightbox && <Lightbox onClose={() => {
                this.lukkLightbox();
            }}>
                <BekreftFeilLederContainer orgnummer={this.state.leder.orgnummer} onAvbryt={() => {
                    this.lukkLightbox();
                }} />
            </Lightbox>}
            <div className="situasjon__innhold">
                {
                    ledere.map((leder, index) => {
                        return (<div className={`leder ${leder.avkreftet ? ' leder--avkreftet' : ''}`} key={index}>
                            <p className="leder__informasjon">
                                {getLedetekst('din-situasjon.naermeste-leder.om', {
                                    '%ORGANISASJONSNAVN%': leder.organisasjonsnavn,
                                    '%LEDER%': leder.navn,
                                })}
                            </p>
                            <div className="leder__handlinger">
                                {
                                    !leder.avkreftet && <button ref={`js-leder-${leder.orgnummer}`} type="button" className="lenke leder__meldFeil js-feil" onClick={() => {
                                        this.apneLightbox(leder);
                                    }}>{getLedetekst('din-situasjon.naermeste-leder.meld-feil')}</button>
                                }
                            </div>
                        </div>);
                    })
                }
            </div>
        </div>);
    }
}

NaermesteLedere.propTypes = {
    ledere: PropTypes.arrayOf(naermesteLederPt),
};
