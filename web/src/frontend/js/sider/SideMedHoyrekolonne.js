import React, { PropTypes } from 'react';
import Brodsmuler from '../components/Brodsmuler.js';
const DocumentTitle = require('react-document-title');

const SideMedHoyrekolonne = ({ children, tittel, brodsmuler = [] }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
        <div className="begrensning begrensning-bred side-syfofront">
            <Brodsmuler brodsmuler={brodsmuler} />
            <div className="row">
                <div className="col-md-8">
                    {children}
                </div>
                <aside className="col-md-4 js-aside">
                    <article className="panel typo-infotekst ikke-print">
                        <h2 className="typo-undertittel">Hjelp oss å bli bedre</h2>
                        <p className="typo-infotekst">Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!</p>
                        <div className="knapperad">
                            <a target="_blank" href="https://www.survey-xact.no/LinkCollector?key=3DRKVYA7351K" className="rammeknapp knapp-liten">Gi tilbakemelding</a>
                        </div>
                    </article>
                </aside>
            </div>
        </div>
    </DocumentTitle>);
};

SideMedHoyrekolonne.propTypes = {
    children: PropTypes.object,
    tittel: PropTypes.string,
    brodsmuler: PropTypes.array,
};

export default SideMedHoyrekolonne;
