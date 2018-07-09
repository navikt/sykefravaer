import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    finnAktiveOppfolgingsdialoger,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import {
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import { finnArbeidsgivereForGyldigeSykmeldinger } from '../../utils/sykmeldingUtils';
import { getContextRoot } from '../../routers/paths';
import OppfolgingsdialogFilm from './OppfolgingsdialogFilm';
import OppfolgingsdialogerOpprett from './opprett/OppfolgingsdialogerOpprett';
import OppfolgingsdialogerIngenplanAT from './opprett/OppfolgingsdialogerIngenplanAT';

export const OppfolgingsdialogNyKnapp = ({ visOppfolgingsdialogOpprett }) => {
    return (<div className="oppfolgingsdialogNyDialog">
        <Knapp
            onClick={() => {
                visOppfolgingsdialogOpprett(true);
            }}>
            {getLedetekst('oppfolgingsdialog.oppfolgingsdialogNyDialog.knapp')}
        </Knapp>
    </div>);
};
OppfolgingsdialogNyKnapp.propTypes = {
    visOppfolgingsdialogOpprett: PropTypes.func,
};

class OppfolgingsdialogerVisning extends Component {
    constructor() {
        super();
        this.state = {
            visOppfolgingsdialogOpprett: false,
        };
        this.visOppfolgingsdialogOpprett = this.visOppfolgingsdialogOpprett.bind(this);
    }

    visOppfolgingsdialogOpprett(vis) {
        this.setState({
            visOppfolgingsdialogOpprett: vis,
        });
    }
    render() {
        const {
            ledetekster,
            oppfolgingsdialoger = [],
            opprettOppfolgingsdialog,
            kopierOppfolgingsdialog,
            dinesykmeldinger,
            naermesteLedere,
        } = this.props;
        const aktivOppfolgingsdialoger = finnAktiveOppfolgingsdialoger(oppfolgingsdialoger, dinesykmeldinger.data);
        const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(dinesykmeldinger.data, naermesteLedere.data);
        return (<div>
            { this.state.visOppfolgingsdialogOpprett &&
            <OppfolgingsdialogerOpprett
                ledetekster={ledetekster}
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgivere={arbeidsgivereForSykmeldinger}
                opprett={opprettOppfolgingsdialog}
                kopier={kopierOppfolgingsdialog}
                visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
            />
            }
            { (oppfolgingsdialoger.length === 0 || !aktivOppfolgingsdialoger.length > 0) &&
            <div className="blokk--l">
                <OppfolgingsdialogerIngenplanAT
                    ledetekster={ledetekster}
                    arbeidsgivere={arbeidsgivereForSykmeldinger}
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
                    opprett={opprettOppfolgingsdialog}
                    rootUrl={getContextRoot()}
                />
            </div>
            }
            { aktivOppfolgingsdialoger.length > 0 &&
            <div>
                { arbeidsgivereForSykmeldinger.length > 1 &&
                    <OppfolgingsdialogNyKnapp
                        visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
                    />
                }
                <OppfolgingsdialogTeasere
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={aktivOppfolgingsdialoger}
                    tittel={aktivOppfolgingsdialoger.length > 1 ? getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.fler.header.tittel') :
                        getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                    brukerType={BRUKERTYPE.ARBEIDSTAKER}
                    rootUrl={getContextRoot()}
                    rootUrlPlaner={getContextRoot()}
                />
            </div>
            }
            { harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
            <OppfolgingsdialogTeasere
                ledetekster={ledetekster}
                oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                harTidligerOppfolgingsdialoger
                tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                id="OppfolgingsdialogTeasereAT"
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={getContextRoot()}
                rootUrlPlaner={getContextRoot()}
                svgUrl={`${getContextRoot()}/img/svg/plan-godkjent.svg`}
                svgAlt="OppfølgingsdialogTidligere"
            />
            }
            <OppfolgingsdialogFilm ledetekster={ledetekster} />
        </div>);
    }
}
OppfolgingsdialogerVisning.propTypes = {
    dinesykmeldinger: dinesykmeldingerReducerPt,
    naermesteLedere: ledereReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    ledetekster: keyValue,
    opprettOppfolgingsdialog: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerVisning;
