import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Knapp from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lightbox from '../Lightbox';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import * as actions from '../../actions/sykepengesoknader_actions';
import { Vis } from '../../utils';
import Feilstripe from '../Feilstripe';

const sendtTilNAVDato = 'sendtTilNAVDato';
const sendtTilArbeidsgiverDato = 'sendtTilArbeidsgiverDato';
const ledetekstKeySuffixPt = PropTypes.oneOf(['send-til-nav', 'send-til-arbeidsgiver']);
const manglendeDatoPt = PropTypes.oneOf([sendtTilNAVDato, sendtTilArbeidsgiverDato]);

export const EttersendingDialog = (props) => {
    const {
        onClose,
        sykepengesoknad,
        sender,
        sendingFeilet,
        sendSykepengesoknadTilNAV,
        sendSykepengesoknadTilArbeidsgiver,
        ledetekstKeySuffix,
        manglendeDato } = props;

    return (<div className="ettersending">
        <h3 className="modal__tittel">{getLedetekst(`sykepengesoknad.ettersending.info.tittel.${ledetekstKeySuffix}`)}</h3>
        <div dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.ettersending.info.tekst.${ledetekstKeySuffix}`)} />
        <Feilstripe vis={sendingFeilet} />
        <div className="knapperad">
            <Hovedknapp
                disabled={sender}
                spinner={sender}
                className="blokk--s"
                onClick={(e) => {
                    e.preventDefault();
                    if (manglendeDato === sendtTilNAVDato) {
                        sendSykepengesoknadTilNAV(sykepengesoknad.id);
                    } else {
                        sendSykepengesoknadTilArbeidsgiver(sykepengesoknad.id);
                    }
                }}>
                {getLedetekst(`sykepengesoknad.ettersending.knapp.bekreft.${ledetekstKeySuffix}`)}
            </Hovedknapp>
            <p>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                    href="#"
                    className="lenke">Avbryt</a>
            </p>
        </div>
    </div>);
};

EttersendingDialog.propTypes = {
    onClose: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    sendSykepengesoknadTilNAV: PropTypes.func,
    sendSykepengesoknadTilArbeidsgiver: PropTypes.func,
    ledetekstKeySuffix: ledetekstKeySuffixPt,
    manglendeDato: manglendeDatoPt,
};

const mapStateToProps = (state) => {
    return {
        sendingFeilet: state.sykepengesoknader.sendingFeilet,
        sender: state.sykepengesoknader.sender,
    };
};

export const EttersendDialogConnected = connect(mapStateToProps, actions)(EttersendingDialog);

export const EttersendKvittering = ({ onClose, ledetekstKeySuffix }) => {
    return (<div>
        <p className="hode hode--suksess">{getLedetekst(`sykepengesoknad.ettersending.kvittering.${ledetekstKeySuffix}`)}</p>
        <div className="knapperad">
            <Knapp
                className="js-lukk"
                onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}>Lukk</Knapp>
        </div>
    </div>);
};

EttersendKvittering.propTypes = {
    onClose: PropTypes.func,
    ledetekstKeySuffix: ledetekstKeySuffixPt,
};

export const EttersendLightbox = (props) => {
    const { visKvittering } = props;
    const onClose = () => {
        if (visKvittering) {
            props.scrollTilTopp();
        }
        props.onClose();
    };
    return (<Lightbox onClose={onClose} bredde="m">
        { !visKvittering && <EttersendDialogConnected {...props} onClose={onClose} /> }
        { visKvittering && <EttersendKvittering {...props} onClose={onClose} /> }
    </Lightbox>);
};

EttersendLightbox.propTypes = {
    scrollTilTopp: PropTypes.func,
    onClose: PropTypes.func,
    visKvittering: PropTypes.bool,
};

export class Ettersending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visLightbox: false,
            visKvittering: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const forrigeSoknad = this.props.sykepengesoknad;
        const { sykepengesoknad, manglendeDato } = nextProps;
        try {
            if (forrigeSoknad[manglendeDato].getTime() !== sykepengesoknad[manglendeDato].getTime()) {
                this.setState({
                    visKvittering: true,
                });
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    render() {
        const { sykepengesoknad, scrollTilTopp, manglendeDato, ledetekstKeySuffix, dispatch } = this.props;
        if (sykepengesoknad[manglendeDato] && !this.state.visKvittering) {
            return null;
        }
        return (<div className="verktoylinje__element">
            {
                !sykepengesoknad[manglendeDato] && <Knapp
                    mini
                    withRef={(c) => {
                        this.triggEttersending = c;
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            visLightbox: true,
                        });
                    }}
                    className="js-trigger">
                    {getLedetekst(`sykepengesoknad.ettersending.knapp.${ledetekstKeySuffix}`)}
                </Knapp>
            }
            {
                this.state.visLightbox && <EttersendLightbox
                    {...this.props}
                    scrollTilTopp={scrollTilTopp}
                    visKvittering={this.state.visKvittering}
                    onClose={() => {
                        if (this.triggEttersending) {
                            this.triggEttersending.focus();
                        }
                        this.setState({
                            visLightbox: false,
                            visKvittering: false,
                        });
                        dispatch(actions.sendSykepengesoknadHarIkkeFeilet());
                    }} />
            }
        </div>);
    }
}

Ettersending.propTypes = {
    manglendeDato: manglendeDatoPt,
    ledetekstKeySuffix: ledetekstKeySuffixPt,
    sykepengesoknad: sykepengesoknadPt,
    scrollTilTopp: PropTypes.func,
    dispatch: PropTypes.func,
};

const ConnectedEttersending = connect()(Ettersending);

export default ConnectedEttersending;
