import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keyValue, getLedetekst } from 'digisyfo-npm';
import {
    BaserTidligereSkjema,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { opprettOppfolgingArbeidsgiverPt } from '../../../propTypes';
import { finnNyesteTidligereOppfolgingsdialogMedVirksomhet } from '../../../utils/oppfolgingsdialogUtils';
import Lightbox from '../../Lightbox';
import ArbeidsgiverSkjemaForm from './ArbeidsgiverSkjema';
import Feilmelding from '../../Feilmelding';

class OppfolgingsdialogerOpprett extends Component {
    constructor(props) {
        const arbeidsgivere = props.arbeidsgivere;
        super(props);
        this.state = {
            side: arbeidsgivere.length > 1 ? 1 : 2,
            virksomhetsnummer: arbeidsgivere.length === 1 ? arbeidsgivere[0].virksomhetsnummer : '',
        };
        this.settVirksomhetsnummer = this.settVirksomhetsnummer.bind(this);
        this.opprett = this.opprett.bind(this);
    }

    settVirksomhetsnummer(values) {
        if (finnNyesteTidligereOppfolgingsdialogMedVirksomhet(this.props.oppfolgingsdialoger, values.arbeidsgiver)) {
            this.setState({
                side: this.state.side + 1,
                virksomhetsnummer: values.arbeidsgiver,
            });
        } else {
            this.props.opprett(values.arbeidsgiver);
        }
    }

    opprett(values) {
        if (values.baserPaaTidligerePlan === 'true') {
            const oppfolgingsdialog = finnNyesteTidligereOppfolgingsdialogMedVirksomhet(this.props.oppfolgingsdialoger, this.state.virksomhetsnummer);
            if (oppfolgingsdialog) {
                this.props.kopier(oppfolgingsdialog.id);
            } else {
                this.setState({
                    side: 0,
                });
            }
        } else {
            this.props.opprett(this.state.virksomhetsnummer);
        }
    }

    render() {
        const {
            ledetekster,
            arbeidsgivere,
            oppfolgingsdialoger,
            visOppfolgingsdialogOpprett,
        } = this.props;
        return (
            <Lightbox onClose={() => {
                visOppfolgingsdialogOpprett(false);
            }}>
                {
                    (() => {
                        if (arbeidsgivere.length === 1 && !arbeidsgivere[0].harNaermesteLeder) {
                            return (<Feilmelding
                                tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.oppfolgingsdialogerOpprett.feilmelding.ingenNL.tittel')}
                                melding={getLedetekst('oppfolgingsdialog.arbeidstaker.oppfolgingsdialogerOpprett.feilmelding.ingenNL.melding')}
                            />);
                        } else if (this.state.side === 0) {
                            return (<Feilmelding
                                tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.oppfolgingsdialogerOpprett.feilmelding.ingenTidligerePlan.tittel')}
                                melding={getLedetekst('oppfolgingsdialog.arbeidstaker.oppfolgingsdialogerOpprett.feilmelding.ingenTidligerePlan.melding')}
                            />);
                        }
                        return (<div>
                            { this.state.side === 1 &&
                            <ArbeidsgiverSkjemaForm
                                arbeidsgivere={arbeidsgivere}
                                oppfolgingsdialoger={oppfolgingsdialoger}
                                onSubmit={this.settVirksomhetsnummer}
                            />
                            }
                            { this.state.side === 2 &&
                            <BaserTidligereSkjema
                                ledetekster={ledetekster}
                                onSubmit={this.opprett}
                            />
                            }
                        </div>);
                    })()
                }
            </Lightbox>
        );
    }
}
OppfolgingsdialogerOpprett.propTypes = {
    ledetekster: keyValue,
    arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    visOppfolgingsdialogOpprett: PropTypes.func,
    opprett: PropTypes.func,
    kopier: PropTypes.func,
};

export default OppfolgingsdialogerOpprett;
