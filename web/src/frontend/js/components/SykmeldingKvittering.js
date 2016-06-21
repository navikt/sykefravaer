import React, { PropTypes, Component } from 'react';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { scrollTo } from '../utils';

class SykmeldingKvittering extends Component {

    componentDidMount() {
        scrollTo(this.refs['js-kvittering'], 300);
    }

    render() {
        const { tittel, brodtekst, ledetekster } = this.props;
        return (
            <div ref="js-kvittering">
                <div className="panel blokk typo-infotekst panel-melding side-innhold">
                    <h1 className="hode hode-suksess hode-undertittel hode-dekorert blokk">{tittel}</h1>
                    { brodtekst && <p className="redaksjonelt-innhold">{brodtekst}</p> }
                    <p>
                        <Link to={`${getContextRoot()}/sykmeldinger/`}>{getLedetekst('kvittering.undertekst.lenke', ledetekster)}</Link>
                    </p>
                </div>
                <article className="panel blokk side-innhold">
                    <h2 className="typo-undertittel">{getLedetekst('kvittering.sok-om-sykepenger.tittel', ledetekster)}</h2>
                    <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('kvittering.sok-om-sykepenger.tekst', ledetekster)} />
                </article>
            </div>
        );
    }
}

SykmeldingKvittering.propTypes = {
    ledetekster: PropTypes.object,
    tittel: PropTypes.string,
    brodtekst: PropTypes.string,
};

export default SykmeldingKvittering;
