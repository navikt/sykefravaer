/* eslint-disable no-console */
import React, { Component } from 'react';
import { Radio, Checkbox } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

class KoronaSchema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periode: undefined,
            arbeidsgivere: [],
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
        console.log(arbeidssituasjon, arbeidsgivere, periode);

        return (
            <div>
                <div>
                    <h3>Velg perioden du er syk (?)</h3>
                    Periodevalg
                </div>
                <div>
                    hvis arbeidsgiver, vis denne:
                    <h3>Velg arbeidsgivere vi skal sende sykmeldingen til</h3>
                    <Checkbox
                        checked={arbeidsgivere.arbeidsgiver1}
                        name="arbeidsgiver1"
                        onChange={(e) => { return this.updateArbeidsgivere(e.target.name); }}
                        label="Arbeidsgiver 1" />
                    <Checkbox
                        checked={arbeidsgivere.arbeidsgiver2}
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
                <Hovedknapp>Send sykmelding</Hovedknapp>
            </div>

        );
    }
}

export default KoronaSchema;
