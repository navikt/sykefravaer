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

const Landingsside = ({ ledetekster = {}, skjulVarsel = false }) => {
    return (<div>
        <div className="sidetopp">
            <h1 className="sidetopp__tittel js-sidetittel">
                {getLedetekst('landingsside.sidetittel', ledetekster)}
            </h1>
        </div>
        {
            (!skjulVarsel ? <UnderUtviklingVarselContainer ledetekster={ledetekster} /> : null)
        }
        <nav role="navigation">
            <Link className="tidslinjeTeaser js-intro-banner side-innhold" to="/sykefravaer/tidslinjen">
                <div className="tidslinjeTeaser__img">
                    <img src="/sykefravaer/img/svg/illustrasjon-landingsside-2.svg"
                        alt={getLedetekst('landingsside.intro.lenketekst', ledetekster)} />
                </div>
                <div className="tidslinjeTeaser__innhold">
                    <h2 className="typo-undertittel">{getLedetekst('landingsside.intro.tittel', ledetekster)}</h2>
                    <p>{getLedetekst('landingsside.intro.tekst', ledetekster)} </p>
                    <p className="ustilet">
                        <span className="lenke-fremhevet">{getLedetekst('landingsside.intro.lenketekst', ledetekster)}</span>
                    </p>
                </div>
            </Link>
            <LandingssideLenke to="/sykefravaer/sykmeldinger" ikonAlt="Lege">
                {getLedetekst('landingsside.tilsykmeldinger.lenketekst', ledetekster)}
            </LandingssideLenke>
        </nav>
        <NaermesteLedereContainer />
        <GenerellInfo ledetekster={ledetekster} />
    </div>);
};

Landingsside.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default Landingsside;
