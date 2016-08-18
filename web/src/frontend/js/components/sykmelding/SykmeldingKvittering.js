import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from '../../ledetekster';
import { getContextRoot } from '../../routers/paths.js';
import { scrollTo } from '../../utils';

class SykmeldingKvittering extends Component {

    componentDidMount() {
        scrollTo(this.refs['js-kvittering'], 300);
    }

    render() {
        const { tittel, brodtekst, ledetekster, sykepengerTittel, sykepengerTekst } = this.props;
        return (
            <div ref="js-kvittering">
                <h1 className="side-header typo-sidetittel">{getLedetekst('din-sykmelding.kvittering.sidetittel', ledetekster)}</h1>
                <div className="panel blokk typo-infotekst panel-melding side-innhold">
                    <h2 className="hode hode-suksess hode-undertittel hode-dekorert blokk">{tittel}</h2>
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
    sykepengerTekst: PropTypes.object,
    sykepengerTittel: PropTypes.string,
};

export default SykmeldingKvittering;
