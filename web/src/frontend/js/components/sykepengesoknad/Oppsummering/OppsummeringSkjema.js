import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link } from 'react-router';
import { Varselstripe, getLedetekst, Utvidbar, SoknadOppsummering, VaerKlarOverAt } from 'digisyfo-npm';
import setup from '../setup';
import SykepengerSkjema from '../SykepengerSkjema';
import Knapperad from '../../skjema/Knapperad';
import mapSkjemasoknadToBackendsoknad from '../../../utils/mapSkjemasoknadToBackendsoknad';
import CheckboxSelvstendig from '../../skjema/CheckboxSelvstendig';
import validate from '../validering/validerOppsummering';
import { sykepengesoknad as sykepengesoknadPt, oppsummeringsoknad as oppsummeringsoknadPt } from '../../../propTypes';
import ForskuttererArbeidsgiver from './ForskuttererArbeidsgiver';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad/AvbrytSoknadContainer';

export const SendingFeilet = () => {
    return (<div className="panel panel--komprimert">
        <Varselstripe type="feil">
            <p className="sist">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
        </Varselstripe>
    </div>);
};

const mottaker = (sendesTil, sykepengesoknad) => {
    switch (sendesTil) {
        case 'NAV': return getLedetekst('sykepengesoknad.oppsummering.nav-som-mottaker');
        case 'ARBEIDSGIVER': return getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn });
        case 'NAV_OG_ARBEIDSGIVER': return getLedetekst('sykepengesoknad.oppsummering.nav-og-arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn });
        default: return undefined;
    }
};

export class OppsummeringForm extends Component {
    componentDidMount() {
        if (this.form) {
            this.form.focus();
        }
    }

    render() {
        const { sykepengesoknad, oppsummeringsoknad, handleSubmit, actions, sender, sendingFeilet, visForskutteringssporsmal, sendesTil } = this.props;
        const label = getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label');
        const onSubmit = (values) => {
            const soknad = mapSkjemasoknadToBackendsoknad(values, {
                visForskutteringssporsmal: visForskutteringssporsmal === true,
            });
            soknad.oppsummering = oppsummeringsoknad;
            const soknadObjekt = JSON.parse(JSON.stringify(soknad)); // Hack for å sikre riktig datoformat
            actions.sendSykepengesoknad(soknadObjekt);
        };

        return (<form
            className="sykepengerskjema"
            ref={(c) => {
                this.form = c;
            }}
            tabIndex="-1"
            id="oppsummering-skjema"
            onSubmit={handleSubmit(onSubmit)}>
            <Utvidbar tittel="Oppsummering" erApen={false} className="blokk">
                <SoknadOppsummering oppsummeringsoknad={oppsummeringsoknad} />
            </Utvidbar>
            <VaerKlarOverAt ansvarserklaring={oppsummeringsoknad.ansvarserklaring} />
            <div className="bekreftet-container blokk">
                <Field component={CheckboxSelvstendig} name="bekreftetKorrektInformasjon" id="bekreftetKorrektInformasjon" label={label} />
            </div>
            { visForskutteringssporsmal && <ForskuttererArbeidsgiver /> }
            { sendingFeilet && <SendingFeilet /> }
            { !visForskutteringssporsmal && <p className="js-mottaker sykepengerskjema__sendesTil">{mottaker(sendesTil, sykepengesoknad)}</p> }
            <Knapperad variant="knapperad--forrigeNeste knapperad--medAvbryt">
                <Link
                    to={`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`}
                    className="rammeknapp rammeknapp--forrige">{getLedetekst('sykepengesoknad.tilbake')}
                </Link>
                <button
                    className="knapp js-send"
                    type="submit"
                    disabled={sender}>{getLedetekst('sykepengesoknad.send')}{sender ? ' ' : null}{ sender ? <span className="knapp__spinner" /> : null}
                </button>
            </Knapperad>
            <AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />
        </form>);
    }
}

OppsummeringForm.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    handleSubmit: PropTypes.func,
    oppsummeringsoknad: oppsummeringsoknadPt,
    actions: PropTypes.shape({
        sendSykepengesoknad: PropTypes.func,
    }),
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    visForskutteringssporsmal: PropTypes.bool,
    sendesTil: PropTypes.string,
};

const OppsummeringSkjema = setup(validate, OppsummeringForm);

const OppsummeringSide = (props) => {
    const { sykepengesoknad } = props;
    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad}>
        <OppsummeringSkjema {...props} />
    </SykepengerSkjema>);
};

OppsummeringSide.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default OppsummeringSide;
