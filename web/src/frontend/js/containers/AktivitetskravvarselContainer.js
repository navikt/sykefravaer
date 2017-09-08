import React, { Component, PropTypes } from 'react';
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
        return (<Side tittel="Aktivitetskrav" brodsmuler={brodsmuler}>
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
                        tittel="Du har ingen varsel om aktivitetsplikt"
                        melding="Hvis du får et slikt varsel, får du mer informasjon om aktivitetsplikten på denne siden." />);
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
    henter: PropTypes.func,
    hentingFeilet: PropTypes.func,
};

const sorterHendelser = (a, b) => {
    if (a.inntruffetdato.getTime() > b.inntruffetdato.getTime()) {
        return -1;
    } else if (a.inntruffetdato.getTime() < b.inntruffetdato.getTime()) {
        return 1;
    }
    return 0;
};

const erAktivitetskravhendelse = (hendelse) => {
    return hendelse.type === AKTIVITETSKRAV_VARSEL || hendelse.type === AKTIVITETSKRAV_BEKREFTET;
};

const getSorterteAktivitetskravHendelser = (hendelser) => {
    return [...hendelser]
        .filter(erAktivitetskravhendelse)
        .sort(sorterHendelser);
};

export const getAktivitetskravvisning = (hendelser) => {
    const _hendelser = getSorterteAktivitetskravHendelser(hendelser);
    if (_hendelser.length === 0) {
        return INGEN_AKTIVITETSKRAVVARSEL;
    }
    if (_hendelser[0].type === AKTIVITETSKRAV_VARSEL) {
        return NYTT_AKTIVITETSKRAVVARSEL;
    }
    return AKTIVITETSVARSELKVITTERING;
};

export function mapStateToProps(state) {
    const visning = getAktivitetskravvisning(state.hendelser.data);
    const varselhendelser = [...state.hendelser.data].filter((h) => {
        return h.type === AKTIVITETSKRAV_VARSEL;
    }).sort(sorterHendelser);
    const bekreftetHendelser = [...state.hendelser.data].filter((h) => {
        return h.type === AKTIVITETSKRAV_BEKREFTET;
    }).sort(sorterHendelser);

    return {
        hentingFeilet: state.ledetekster.hentingFeilet,
        henter: state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
        visning,
        varseldato: varselhendelser.length > 0 ? varselhendelser[0].inntruffetdato : null,
        bekreftetdato: bekreftetHendelser.length > 0 ? bekreftetHendelser[0].inntruffetdato : null,
        hentingFeiletHendelser: state.hendelser.hentingFeilet,
        hendelserHentet: state.hendelser.hendelserHentet,
    };
}

AktivitetskravvarselContainer = connect(mapStateToProps, { hentHendelser })(AktivitetskravvarselContainer);

export default AktivitetskravvarselContainer;
