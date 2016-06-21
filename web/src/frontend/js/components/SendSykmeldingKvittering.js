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
                    <h1 className="hode hode-suksess hode-undertittel hode-dekorert blokk">{getLedetekst('kvittering.tittel', ledetekster)}</h1>
                    <p className="redaksjonelt-innhold">
                        {
                            ((arbeidsgiver) => {
                                const ledetekstNokkel = arbeidsgiver && arbeidsgiver.navn ? 'kvittering.undertekst.tekst.med-arbeidsgiver' : 'kvittering.undertekst.tekst.uten-arbeidsgiver';
                                const params = {};
                                if(arbeidsgiver) {
                                    params['%ARBEIDSGIVER%'] = arbeidsgiver.navn;
                                }
                                return `${getLedetekst(ledetekstNokkel, ledetekster, params)} `;
                            })(sykmelding.valgtArbeidsgiver)
                        }
                    </p>
                    <p>
                        <Link to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}`}>{getLedetekst('kvittering.undertekst.lenke', ledetekster)}</Link>
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

SendSykmeldingKvittering.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SendSykmeldingKvittering;
