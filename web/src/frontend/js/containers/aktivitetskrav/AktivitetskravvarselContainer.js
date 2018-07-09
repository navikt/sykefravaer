import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toDatePrettyPrint, scrollTo, getLedetekst, keyValue } from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import Artikkel from '../../components/aktivitetskrav/AktivitetskravArtikkel';
import BekreftAktivitetskravSkjema from '../../components/aktivitetskrav/BekreftAktivitetskravSkjema';
import { AKTIVITETSKRAV_VARSEL, AKTIVITETSKRAV_BEKREFTET } from '../../enums/hendelsetyper';
import { hentHendelser } from '../../actions/hendelser_actions';
import { Vis } from '../../utils';

export const INGEN_AKTIVITETSKRAVVARSEL = 'INGEN_AKTIVITETSKRAVVARSEL';
export const NYTT_AKTIVITETSKRAVVARSEL = 'NYTT_AKTIVITETSKRAVVARSEL';
export const AKTIVITETSVARSELKVITTERING = 'AKTIVITETSVARSELKVITTERING';

const Kvittering = ({ bekreftetdato, ledetekster }) => {
    return (<Alertstripe type="suksess">
        <p className="sist">{getLedetekst('aktivitetskrav-varsel.kvittering', ledetekster, {
            '%DATO%': toDatePrettyPrint(bekreftetdato),
        })}</p>
    </Alertstripe>);
};

Kvittering.propTypes = {
    bekreftetdato: PropTypes.instanceOf(Date),
    ledetekster: keyValue,
};

class Container extends Component {
    componentDidMount() {
        const { hendelserHentet, hentingFeiletHendelser } = this.props;
        if (!hendelserHentet && !hentingFeiletHendelser) {
            this.props.hentHendelser();
        }
    }

    componentDidUpdate(prevProps) {
        const { visning } = this.props;
        const forrigeVisning = prevProps.visning;

        if (visning === AKTIVITETSVARSELKVITTERING && forrigeVisning === NYTT_AKTIVITETSKRAVVARSEL) {
            scrollTo(this.kvittering, 200);
        }
    }

    render() {
        const { henter, hendelserHentet, hentingFeilet, ledetekster, visning, varseldato, bekreftetdato } = this.props;
        const brodsmuler = [{
            sti: '/',
            tittel: 'Ditt sykefravær',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('aktivitetskrav-varsel.tittel', ledetekster),
        }];
        return (<Side tittel="Aktivitetskrav" brodsmuler={brodsmuler} laster={henter || !hendelserHentet}>
            {
                (() => {
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (henter || !hendelserHentet) {
                        return <AppSpinner />;
                    }
                    if (visning === INGEN_AKTIVITETSKRAVVARSEL) {
                        return (<Feilmelding
                            tittel={getLedetekst('aktivitetskrav-varsel.ingen-varsel.tittel')}
                            melding={getLedetekst('aktivitetskrav-varsel.ingen-varsel.melding')} />);
                    }
                    return (<div>
                        <div
                            aria-live="polite"
                            role="alert"
                            ref={(c) => {
                                this.kvittering = c;
                            }}>
                            <Vis
                                hvis={visning === AKTIVITETSVARSELKVITTERING}
                                render={() => {
                                    return <Kvittering ledetekster={ledetekster} bekreftetdato={bekreftetdato} />;
                                }} />
                        </div>
                        <Artikkel ledetekster={ledetekster} inntruffetdato={varseldato} />
                        <Vis
                            hvis={visning !== AKTIVITETSVARSELKVITTERING}
                            render={() => {
                                return <BekreftAktivitetskravSkjema />;
                            }} />
                    </div>);
                })()
            }
        </Side>);
    }
}

Container.propTypes = {
    hendelserHentet: PropTypes.bool,
    hentingFeiletHendelser: PropTypes.bool,
    visning: PropTypes.oneOf([INGEN_AKTIVITETSKRAVVARSEL, NYTT_AKTIVITETSKRAVVARSEL, AKTIVITETSVARSELKVITTERING]),
    ledetekster: keyValue,
    varseldato: PropTypes.instanceOf(Date),
    bekreftetdato: PropTypes.instanceOf(Date),
    hentHendelser: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

const sorterHendelser = (a, b) => {
    if (a.inntruffetdato.getTime() > b.inntruffetdato.getTime()) {
        return -1;
    } else if (a.inntruffetdato.getTime() < b.inntruffetdato.getTime()) {
        return 1;
    }
    return 0;
};

const getSisteAktivitetskrav = (hendelser) => {
    return [...hendelser]
        .sort(sorterHendelser)
        .filter((h) => {
            return h.type === AKTIVITETSKRAV_VARSEL;
        })[0];
};

const getBekreftelseAvAktivitetskrav = (hendelser, aktivitetskrav) => {
    return hendelser
        .filter((h) => {
            return h.type === AKTIVITETSKRAV_BEKREFTET;
        })
        .filter((h) => {
            return parseInt(h.ressursId, 10) === aktivitetskrav.id;
        })[0];
};

export const getAktivitetskravvisning = (hendelser) => {
    const sisteAktivitetskrav = getSisteAktivitetskrav(hendelser);
    const bekreftelseAvSisteAktivitetskrav = getBekreftelseAvAktivitetskrav(hendelser, sisteAktivitetskrav);

    if (!sisteAktivitetskrav) {
        return INGEN_AKTIVITETSKRAVVARSEL;
    }
    if (bekreftelseAvSisteAktivitetskrav) {
        return AKTIVITETSVARSELKVITTERING;
    }
    return NYTT_AKTIVITETSKRAVVARSEL;
};

export function mapStateToProps(state) {
    const visning = getAktivitetskravvisning(state.hendelser.data);
    const sisteAktivitetskrav = getSisteAktivitetskrav(state.hendelser.data);
    const bekreftelseAvSisteAktivitetskrav = getBekreftelseAvAktivitetskrav(state.hendelser.data, sisteAktivitetskrav);

    return {
        hentingFeilet: state.ledetekster.hentingFeilet,
        henter: state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
        visning,
        varseldato: sisteAktivitetskrav ? sisteAktivitetskrav.inntruffetdato : null,
        bekreftetdato: bekreftelseAvSisteAktivitetskrav ? bekreftelseAvSisteAktivitetskrav.inntruffetdato : null,
        hentingFeiletHendelser: state.hendelser.hentingFeilet,
        hendelserHentet: state.hendelser.hentet,
    };
}

const AktivitetskravvarselContainer = connect(mapStateToProps, { hentHendelser })(Container);

export default AktivitetskravvarselContainer;
