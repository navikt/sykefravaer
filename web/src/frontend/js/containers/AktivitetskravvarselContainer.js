import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import Artikkel from '../components/aktivitetskrav/AktivitetskravArtikkel';
import BekreftAktivitetskravSkjema from '../components/aktivitetskrav/BekreftAktivitetskravSkjema';
import { AKTIVITETSKRAV_VARSEL, AKTIVITETSKRAV_BEKREFTET } from '../enums/hendelsetyper';
import { Varselstripe } from 'digisyfo-npm';
import { hentHendelser } from '../actions/hendelser_actions';
import { toDatePrettyPrint, scrollTo, getLedetekst } from 'digisyfo-npm';

export const INGEN_AKTIVITETSKRAVVARSEL = 'INGEN_AKTIVITETSKRAVVARSEL';
export const NYTT_AKTIVITETSKRAVVARSEL = 'NYTT_AKTIVITETSKRAVVARSEL';
export const AKTIVITETSVARSELKVITTERING = 'AKTIVITETSVARSELKVITTERING';

const Kvittering = ({ bekreftetdato, ledetekster }) => {
    return (<div className="panel panel--komprimert">
        <Varselstripe type="suksess" fylt>
            <p className="sist">{getLedetekst('aktivitetskrav-varsel.kvittering', ledetekster, {
                '%DATO%': toDatePrettyPrint(bekreftetdato),
            })}</p>
        </Varselstripe>
    </div>);
};

Kvittering.propTypes = {
    bekreftetdato: PropTypes.instanceOf(Date),
    ledetekster: PropTypes.object,
};

class AktivitetskravvarselContainer extends Component {
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
            scrollTo(this.refs.kvittering, 200);
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
                    <div aria-live="polite" role="alert" ref="kvittering">
                        { visning === AKTIVITETSVARSELKVITTERING && <Kvittering ledetekster={ledetekster} bekreftetdato={bekreftetdato} /> }
                    </div>
                    <Artikkel ledetekster={ledetekster} inntruffetdato={varseldato} />
                    { visning !== AKTIVITETSVARSELKVITTERING && <BekreftAktivitetskravSkjema /> }
                </div>);
            })()
        }
        </Side>);
    }
}

AktivitetskravvarselContainer.propTypes = {
    hendelserHentet: PropTypes.bool,
    hentingFeiletHendelser: PropTypes.bool,
    visning: PropTypes.oneOf([INGEN_AKTIVITETSKRAVVARSEL, NYTT_AKTIVITETSKRAVVARSEL, AKTIVITETSVARSELKVITTERING]),
    ledetekster: PropTypes.object,
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

AktivitetskravvarselContainer = connect(mapStateToProps, { hentHendelser })(AktivitetskravvarselContainer);

export default AktivitetskravvarselContainer;
