import React, { Component } from 'react';
import { getHtmlLedetekst, getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import classNames from 'classnames';
import Lightbox from '../Lightbox';
import BekreftFeilLederContainer from '../../containers/landingsside/BekreftFeilLederContainer';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';

export default class NaermesteLeder extends Component {
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
        const knapp = this[`leder-${this.state.leder.orgnummer}`];
        if (knapp) {
            knapp.focus();
        }
        this.setState({
            visLightbox: false,
            leder: undefined,
        });
    }

    render() {
        const { leder } = this.props;
        const classNameLeder = classNames('leder', { 'leder--avkreftet': leder.avkreftet });
        return (
            <div className={classNameLeder}>
                {this.state.visLightbox && <Lightbox onClose={() => {
                    this.lukkLightbox();
                }}>
                    <BekreftFeilLederContainer
                        orgnummer={this.state.leder.orgnummer}
                        onAvbryt={() => {
                            this.lukkLightbox();
                        }} />
                </Lightbox>}
                <p
                    className="leder__informasjon"
                    dangerouslySetInnerHTML={getHtmlLedetekst('din-situasjon.naermeste-leder', {
                        '%LEDER%': leder.navn,
                    })} />
                <div className="leder__handlinger">
                    {
                        !leder.avkreftet && <button
                            ref={(c) => {
                                this[`leder-${leder.orgnummer}`] = c;
                            }}
                            type="button"
                            className="lenke leder__meldFeil js-feil"
                            onClick={() => {
                                this.apneLightbox(leder);
                            }}>{getLedetekst('din-situasjon.naermeste-leder.meld-feil')}</button>
                    }
                </div>
                <div className="leder__forskuttering">
                    <p className="leder__forskuttering__tekst">{getLedetekst(`din-situasjon.arbeidsgiver-forskutterer${leder.arbeidsgiverForskuttererLoenn ? '' : '-ikke'}`)}</p>
                    <Hjelpetekst
                        tittel={getLedetekst('din-situasjon.forskuttering.hjelpetekst.tittel')}
                        tekst={getLedetekst('din-situasjon.forskuttering.hjelpetekst.tekst')} />
                </div>
            </div>);
    }
}

NaermesteLeder.propTypes = {
    leder: naermesteLederPt,
};
