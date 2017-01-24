import React, { PropTypes } from 'react';
import setup from '../setup';
import FravaerOgFriskmelding from './FravaerOgFriskmelding';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import { Utvidbar } from '../../../digisyfo-npm';
import CheckboxSelvstendig from '../../skjema/CheckboxSelvstendig';
import { Field } from 'redux-form';
import { Avkrysset } from './opplysninger';
import SykepengerSkjema from '../SykepengerSkjema';
import history from '../../../history';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';

export const Oppsummering = ({ soknad, sykmelding, handleSubmit }) => {
    const label = 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte';
    const onSubmit = () => {
        history.replace('/sykepenger/kvittering');
    };

    return (<SykepengerSkjema aktivtSteg="3">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="blokk">
                <Utvidbar tittel="Oppsummering" Overskrift="h2">
                    <div>
                        <div className="oppsummering__bolk">
                            <Avkrysset tekst="Jeg er klar over at dersom jeg gir uriktige opplysninger eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar." />
                        </div>
                        <FravaerOgFriskmelding soknad={soknad} />
                        <AktiviteterISykmeldingsperioden soknad={soknad} sykmelding={sykmelding} />
                    </div>
                </Utvidbar>
          </div>
          <div className="panel blokk">
              <p>Vær klar over at</p>
              <ul>
                  <li>rett til sykepenger forutsetter at du har inntektstap på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li>
                  <li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li>
                  <li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li>
              </ul>
          </div>
          <Field component={CheckboxSelvstendig} name="informasjonLestOgBekreftetKorrekt" id="informasjonLestOgBekreftetKorrekt" label={label} />
          <Knapperad variant="knapperad--forrigeNeste">
              <Link to="/sykepenger/aktiviteter-i-sykmeldingsperioden" className="rammeknapp rammeknapp--forrige">Tilbake</Link>
              <button className="knapp">Send søknad</button>
          </Knapperad>
      </form>
  </SykepengerSkjema>);
};

Oppsummering.propTypes = {
    soknad: PropTypes.object,
    sykmelding: PropTypes.object,
    handleSubmit: PropTypes.func,
};

const validate = (values) => {
    if (!values.informasjonLestOgBekreftetKorrekt) {
        return {
            informasjonLestOgBekreftetKorrekt: 'Du må bekrefte at du har lest informasjonen og bekreftet at opplysningene du har gitt er korrekte',
        };
    }
    return {};
};

const OppsummeringSkjema = setup(validate, Oppsummering);

export default OppsummeringSkjema;
