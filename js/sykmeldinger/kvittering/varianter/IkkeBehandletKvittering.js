import React from 'react';

const IkkeBehandletKvittering = () => {
    return (
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <div className="kvitteringsteg">
                    <div className="kvitteringsteg__innhold">
                        <h2 className="kvitteringsteg__tittel js-tittel">
                            <span className="kvitteringsteg__nummer kvitteringsteg__nummer--ok">1</span>
                            Nå har du gjort første del
                        </h2>
                        <div className="js-tekst">
                            <div className="kvitteringsteg__tekst">
                                <p>Du har sendt beskjed om sykefraværet til arbeidsgiveren din.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="kvitteringsteg">
                    <div className="kvitteringsteg__innhold">
                        <h2 className="kvitteringsteg__tittel js-tittel">
                            <span className="kvitteringsteg__nummer">2</span>
                            Hva med sykepengene?
                        </h2>
                        <div className="js-tekst">
                            <div className="kvitteringsteg__tekst">
                                <p>
                                    Akkurat nå kan ikke systemet slå opp om du trenger å søke om sykepenger
                                    <br />
                                    Hvis du trenger å søke, vil du få en melding fra oss når det er aktuelt.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IkkeBehandletKvittering;
