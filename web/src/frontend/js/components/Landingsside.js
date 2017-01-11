import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import UnderUtviklingVarselContainer from '../containers/UnderUtviklingVarselContainer';
import NaermesteLedereContainer from '../containers/NaermesteLedereContainer';
import LandingssideLenke from './LandingssideLenke';

export class GenerellInfo extends Component {
    componentDidMount() {
        window.setTimeout(() => {
            document.body.focus();
        }, 200);
    }

    render() {
        return (<article className="panel blokk side-innhold js-generell-informasjon">
            <h2 className="typo-undertittel">Sykmeldt &mdash; hva nå?</h2>
            <div dangerouslySetInnerHTML={getHtmlLedetekst('landingsside.generell.informasjon.tekst', this.props.ledetekster)} />
            <p>
                <a href={getLedetekst('landingsside.generell.informasjon.lenke1.url', this.props.ledetekster)}>
                    {getLedetekst('landingsside.generell.informasjon.lenke1.tittel', this.props.ledetekster)}
                </a>
            </p>
            <p>
                <Link to={getLedetekst('landingsside.generell.informasjon.lenke2.url', this.props.ledetekster)}>
                    {getLedetekst('landingsside.generell.informasjon.lenke2.tittel', this.props.ledetekster)}
                </Link>
            </p>
        </article>);
    }

}

GenerellInfo.propTypes = {
    ledetekster: PropTypes.object,
};

const Landingsside = ({ ledetekster = {}, skjulVarsel = false, soknader = [], dialogmoter = [] }) => {
    return (<div>
        <div className="sidetopp">
            <img className="sidetopp__bilde blokk" src="/sykefravaer/img/svg/illustrasjon-landingsside-2.svg"
                alt={getLedetekst('landingsside.intro.lenketekst', ledetekster)} />
            <h1 className="sidetopp__tittel js-sidetittel">
                {getLedetekst('landingsside.sidetittel', ledetekster)}
            </h1>
        </div>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer ledetekster={ledetekster} /> : null)
        }
        <nav role="navigation">
            <LandingssideLenke to="/sykefravaer/tidslinjen" ikon="tidslinje" ikonAlt="Tidslinjen" tittel="Tidslinjen"
                undertittel="Informasjon og oversikt over aktiviteter" variant="fersken" />
            <LandingssideLenke to="/sykefravaer/sykmeldinger" ikon="sykmeldinger" ikonAlt="Sykmelding" tittel="Sykmeldinger"
                variant="lysblaa" />
            {
                soknader.length > 0 &&
                    <LandingssideLenke to="/sykefravaer/soknader" ikon="soknader" ikonAlt="Søknader" tittel="Søknader om sykepenger" variant="lysgronn" />

            }
            {
                dialogmoter.length > 0 &&
                    <LandingssideLenke to="/sykefravaer/#" ikon="dialogmoter" ikonAlt="Dialogmøter" tittel="Dialogmøter" variant="ceil" />
            }
        </nav>
        <NaermesteLedereContainer />
        <GenerellInfo ledetekster={ledetekster} />
    </div>);
};

Landingsside.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
    soknader: PropTypes.array,
    dialogmoter: PropTypes.array,
};

export default Landingsside;
