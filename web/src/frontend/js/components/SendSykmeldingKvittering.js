import React, { PropTypes, Component } from 'react';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { scrollTo } from '../utils';

class SendSykmeldingKvittering extends Component {

    componentDidMount() {
        scrollTo(this.refs['js-kvittering'], 300);
    }

    render() {
        const { sykmelding, ledetekster } = this.props;
        return (
            <div ref="js-kvittering">
                <div className="panel blokk typo-infotekst panel-melding side-innhold">
                    <h1 className="hode hode-suksess hode-undertittel hode-dekorert blokk">Sykmeldingen er sendt</h1>
                    <p>
                        <span>{getLedetekst('kvittering.undertekst.tekst', ledetekster, { '%ARBEIDSGIVER%': sykmelding.valgtArbeidsgiver.navn })} </span>
                        <Link to={`${getContextRoot()}/sykmeldinger`}>{getLedetekst('kvittering.undertekst.lenke', ledetekster)}</Link>
                    </p>
                </div>

                <article className="panel blokk side-innhold">
                    <h2 className="typo-undertittel">Skal du søke om sykepenger?</h2>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('kvittering.sok-om-sykpenger.tekst', ledetekster)} />
                </article>
            </div>
        );
    }
}

SendSykmeldingKvittering.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendSykmeldingKvittering;
