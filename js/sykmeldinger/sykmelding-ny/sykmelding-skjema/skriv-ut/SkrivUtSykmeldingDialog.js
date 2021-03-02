import React from 'react';
import { Link } from 'react-router';
import { getHtmlLedetekst, getLedetekst } from '../../../../digisyfoNpm';
import getContextRoot from '../../../../utils/getContextRoot';
import { sykmelding as sykmeldingPt } from '../../../../propTypes';

const SkrivUtSykmeldingDialog = (props) => {
    const { sykmelding } = props;
    return (
        <div className="ekstrasporsmal ekstrasporsmal--sist">
            <div
                className="hode hode--advarsel redaksjonelt-innhold"
                dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst')} />
            <div className="knapperad">
                <p>
                    <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="knapp">
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
