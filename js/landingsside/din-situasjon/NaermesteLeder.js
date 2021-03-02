import React, { Component } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import classNames from 'classnames';
import { getHtmlLedetekst, getLedetekst } from '../../digisyfoNpm';
import Lightbox from '../../components/Lightbox';
import BekreftFeilLederContainer from './BekreftFeilLederContainer';
import { naermesteLeder as naermesteLederPt } from '../../propTypes/index';

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
        const { leder } = this.state;
        const knapp = this[`leder-${leder.orgnummer}`];
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
        const { visLightbox } = this.state;
        const classNameLeder = classNames('leder', { 'leder--avkreftet': leder.avkreftet });
        return (
            <div className={classNameLeder}>
                {
                    visLightbox
                    && (
                        <Lightbox
                            bredde="m"
                            onClose={() => {
                                this.lukkLightbox();
                            }}>
                            <BekreftFeilLederContainer
                                orgnummer={leder.orgnummer}
                                onAvbryt={() => {
                                    this.lukkLightbox();
                                }} />
                        </Lightbox>
                    )
                }
                <p
                    className="leder__informasjon"
                    dangerouslySetInnerHTML={getHtmlLedetekst('din-situasjon.naermeste-leder', {
                        '%LEDER%': leder.navn,
                    })} />
                <div className="leder__handlinger">
                    {
                        !leder.avkreftet && (
                            <button
                                ref={(c) => {
                                    this[`leder-${leder.orgnummer}`] = c;
                                }}
                                type="button"
                                className="lenke leder__meldFeil js-feil"
                                onClick={() => {
                                    this.apneLightbox(leder);
                                }}>
                                {getLedetekst('din-situasjon.naermeste-leder.meld-feil')}
                            </button>
                        )
                    }
                </div>
                {
                    leder.arbeidsgiverForskuttererLoenn != null
                    && (
                        <div className="leder__forskuttering">
                            <p
                                className="leder__forskuttering-tekst"
                            >
                                {getLedetekst(`din-situasjon.arbeidsgiver-forskutterer${leder.arbeidsgiverForskuttererLoenn ? '' : '-ikke'}`)}
                            </p>
                            <Hjelpetekst>{getLedetekst('din-situasjon.forskuttering.hjelpetekst.tekst')}</Hjelpetekst>
                        </div>
                    )
                }
            </div>
        );
    }
}

NaermesteLeder.propTypes = {
    leder: naermesteLederPt,
};
