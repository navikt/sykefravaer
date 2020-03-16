/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Element } from 'nav-frontend-typografi';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import { arbeidsgiver as arbeidsgiverPt } from '../../propTypes';

class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periode: undefined,
            arbeidsgivere: props.arbeidsgivere,
            arbeidssituasjon: undefined,
        };
    }

    updateArbeidsgivere(arbeidsgiver) {
        const { arbeidsgivere } = this.state;

        if (arbeidsgivere.includes(arbeidsgiver)) {
            this.setState({ arbeidsgivere: arbeidsgivere.filter((a) => {
                return a !== arbeidsgiver;
            }) });
        } else {
            this.setState({ arbeidsgivere: [...arbeidsgivere, arbeidsgiver] });
        }
    }

    updateArbeidssituasjon(arbeidssituasjon) {
        this.setState({ arbeidssituasjon });
    }

    render() {
        const { arbeidssituasjon, arbeidsgivere, periode } = this.state;
        const { sendSykmelding } = this.props;
        console.log(arbeidssituasjon, arbeidsgivere, periode);

        return (
            <div>
                <Sidetittel tag="h1" style={{ marginBottom: '2rem', textAlign: 'center' }}>14-dagers egenmelding</Sidetittel>
                <Element>NAV har nå opprettet coronamelding for de som mistenker at de er smittet av coronavirus. Du kan selv fylle ut og sende egenmeldingen uten å kontakte fastlege eller legevakten.</Element>
                <br />

                <Lenke href="#">Du kan lese mer om egenmeldingsordningen her.</Lenke>

                <div
                    style={{ marginTop: '2rem' }}>
                    <Bjorn
                        className="blokk"
                        hvit
                        stor>
                            Hei, nedenfor kan du fylle ut og sende inn egenmeldingen om du mistenker at du er syk grunnet coronaviruset.
                        <br />
                        <br />
                        <Knapp>Gå til utfyllingen</Knapp>
                    </Bjorn>
                </div>


                <div>
                    <h3>Velg perioden du er syk (?)</h3>
                    Periodevalg
                </div>
                <div>
                    hvis arbeidsgiver, vis denne:
                    <h3>Velg arbeidsgivere vi skal sende sykmeldingen til</h3>
                    <Checkbox
                        checked={false}
                        name="arbeidsgiver1"
                        onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                        label="Arbeidsgiver 1" />
                    <Checkbox
                        checked={false}
                        name="arbeidsgiver2"
                        onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                        label="Arbeidsgiver 2" />

                    hvis ingen arbeidsgiver, vis denne:
                    <h3>Velg det som passer for deg</h3>
                    <Radio
                        checked={arbeidssituasjon === 'selvstendig'}
                        label="jobb som selvstendig næringsdrivende"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="selvstendig" />
                    <Radio
                        checked={arbeidssituasjon === 'frilanser'}
                        label="jobb som frilanser"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="frilanser" />
                    <Radio
                        checked={arbeidssituasjon === 'annen'}
                        label="jobb hos en annen arbeidsgiver (bortgår?)"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="annen" />
                    <Radio
                        checked={arbeidssituasjon === 'arbeidsledig'}
                        label="Jeg er arbeidsledig"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="arbeidsledig" />
                    <Radio
                        checked={arbeidssituasjon === 'ingenting'}
                        label="Jeg finner ingenting som passer for meg"
                        onChange={(e) => { return this.updateArbeidssituasjon(e.target.name); }}
                        name="ingenting" />
                </div>
                <Hovedknapp onClick={() => { return sendSykmelding({ prop1: 'test1', prop2: 'test2' }); }}>Send sykmelding</Hovedknapp>
            </div>

        );
    }
}

KoronaSchema.propTypes = {
    sendSykmelding: PropTypes.func,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
};


export default KoronaSchema;
