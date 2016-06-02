import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/arbeidsgiverstatus_actions.js';
import DropdownWrapper from '../components/DropdownWrapper.js';
import Dropdown from '../components/Dropdown.js';
import { browserHistory } from 'react-router';

class Arbeidsgiverstatus extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    valider(sykmelding) {
        if (sykmelding.arbeidsgiverstatus != undefined) {
            this.setState({ forsoktSendt: false })
            browserHistory.push(`/sykefravaer/app/sykmeldinger/${sykmelding.id}/send`)
        } else {
            this.setState({ forsoktSendt: true })

        }
    }

    render() {
        const alternativer = [
            {
                'tekst': 'Velg arbeidssituasjon',
                'verdi': 'default',
                'skjult': true,
            },
            {
                'tekst': 'Arbeidstaker',
                'verdi': 'arbeidstaker',
            },
            {
                'tekst': 'Selvstendig næringsdrivende',
                'verdi': 'selvstendig_næringsdrivende',
            },
            {
                'tekst': 'Frilanser',
                'verdi': 'frilanser',
            },
            {
                'tekst': 'Arbeidsledig',
                'verdi': 'arbeidsledig',
            },
            {
                'tekst': 'Annet',
                'verdi': 'annet',
            },
        ];

        return (
            <div>
                <div className="blokk-l">
                    <DropdownWrapper erFeil={this.state.forsoktSendt} feilmelding="Feilmelding">
                        <Dropdown alternativer={alternativer}
                                  valgtAlternativ={this.props.sykmelding.arbeidsgiverstatus}
                                  onChange={(status) => {this.setState({forsoktSendt:false}); return this.props.settArbeidsgiverstatus(status, this.props.sykmelding.id)}}/>
                    </DropdownWrapper>
                </div>
                <div className="knapperad knapperad-adskilt js-videre">

                    <button className="knapp knapp-hoved"
                            onClick={() => this.valider(this.props.sykmelding)}>Gå videre
                    </button>
                </div>
            </div>
        )
    };
}

function mapStateToProps() {
    return {};
}

const ArbeidsgiverstatusContainer = connect(mapStateToProps, Object.assign({}, actionCreators))(Arbeidsgiverstatus);

export default ArbeidsgiverstatusContainer;

