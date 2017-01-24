import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import JaEllerNei from '../JaEllerNei';
import { toDatePrettyPrint } from 'digisyfo-npm';
import AngiTid from './AngiTid';

const Periode = ({ field, index }) => {
    return (<JaEllerNei
        key={index}
        name={`perioder[${index}].jobbetMerEnnPlanlagt`}
        intro={`I perioden ${toDatePrettyPrint(field.fom)} – ${toDatePrettyPrint(field.tom)} var du 100 % sykmeldt hos SOLSTRÅLEN BARNEHAGE.`}
        spoersmal="Har du jobbet?">
        <div>
            <h4 className="skjema__sporsmal">Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos SOLSTRÅLEN BARNEHAGE?</h4>
            <Fields component={AngiTid} periodeIndex={index} names={[`perioder[${index}].gjennomsnittPerUke.enhet`, `perioder[${index}].gjennomsnittPerUke.antall`]} />
        </div>
    </JaEllerNei>);
};

Periode.propTypes = {
    field: PropTypes.object,
    index: PropTypes.number,
};

const GradertPeriode = ({ field, index }) => {
    return (<JaEllerNei
        key={index}
        name={`perioder[${index}].jobbetMerEnnPlanlagt`}
        intro={`I perioden ${toDatePrettyPrint(field.fom)} – ${toDatePrettyPrint(field.tom)} skulle du jobbe 50 % av din normale arbeidstid hos SOLSTRÅLEN BARNEHAGE.`}
        spoersmal="Har du jobbet mer enn dette?">
        <div>
            <h4 className="skjema__sporsmal">Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos SOLSTRÅLEN BARNEHAGE?</h4>
            <Fields
                component={AngiTid}
                periodeIndex={index}
                names={[`perioder[${index}].gjennomsnittPerUke.enhet`, `perioder[${index}].gjennomsnittPerUke.antall`, `perioder[${index}].gjennomsnittPerUke.normaltAntall`]} />
        </div>
    </JaEllerNei>);
};

GradertPeriode.propTypes = {
    field: PropTypes.object,
    index: PropTypes.number,
};

const Perioder = ({ fields }) => {
    return (<div>
        {
            fields.map((field, index) => {
                if (`${field.grad}` !== '100') {
                    return <GradertPeriode field={field} index={index} key={index} />;
                }
                return <Periode field={field} index={index} key={index} />;
            })
        }
    </div>);
};

Perioder.propTypes = {
    fields: PropTypes.array,
};

export default Perioder;
