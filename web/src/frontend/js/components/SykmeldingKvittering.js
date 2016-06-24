import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { scrollTo } from '../utils';

class SykmeldingKvittering extends Component {

    componentDidMount() {
        scrollTo(this.refs['js-kvittering'], 300);
    }

    render() {
        const { tittel, brodtekst, ledetekster, sykepengerTittel, sykepengerTekst } = this.props;
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
                    <h2 className="typo-undertittel">{sykepengerTittel}</h2>
                    <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={sykepengerTekst} />
                </article>
            </div>
        );
    }
}

SykmeldingKvittering.propTypes = {
    ledetekster: PropTypes.object,
    tittel: PropTypes.string,
    brodtekst: PropTypes.string,
    sykepengerTekst: PropTypes.string,
    sykepengerTittel: PropTypes.string,
};

export default SykmeldingKvittering;
