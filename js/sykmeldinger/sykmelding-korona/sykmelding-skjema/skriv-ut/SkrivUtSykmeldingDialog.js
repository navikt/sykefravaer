import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Link } from 'react-router';
import getContextRoot from '../../../../utils/getContextRoot';
import { sykmelding as sykmeldingPt } from '../../../../propTypes';

const SkrivUtSykmeldingDialog = (props) => {
    const { sykmelding } = props;
    return (
        <div className="ekstrasporsmal ekstrasporsmal--sist">
            <div
                className="hode hode--advarsel redaksjonelt-innhold"
                dangerouslySetInnerHTML={{
                    __html: `Siden du ikke finner arbeidsgiveren din i denne listen, kan du ikke sende egenmeldingen digitalt. 
          Du bør spørre arbeidsgiveren din om hvorfor de ikke har registrert deg som arbeidstaker i A-meldingen.`,
                }}
            />
            <div className="knapperad">
                <p>
                    <Link
                        target="_blank"
                        to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`}
                        className="knapp"
                    >
                        {getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

SkrivUtSykmeldingDialog.propTypes = {
    sykmelding: sykmeldingPt.isRequired,
};

export default SkrivUtSykmeldingDialog;
