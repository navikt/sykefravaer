import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import * as hendelsetyper from '../../js/enums/hendelsetyper';
import { mapStateToProps, getAktivitetskravvisning, INGEN_AKTIVITETSKRAVVARSEL, NYTT_AKTIVITETSKRAVVARSEL, AKTIVITETSVARSELKVITTERING } from '../../js/containers/AktivitetskravvarselContainer';


chai.use(chaiEnzyme());
const expect = chai.expect;

export const varselHendelse1 = {
    type: hendelsetyper.AKTIVITETSKRAV_VARSEL,
    inntruffetdato: new Date("2017-09-06")
};

export const varselHendelse2 = {
    type: hendelsetyper.AKTIVITETSKRAV_VARSEL,
    inntruffetdato: new Date("2017-09-10")
};

export const bekreftetHendelse1 = {
    type: hendelsetyper.AKTIVITETSKRAV_BEKREFTET,
    inntruffetdato: new Date("2017-09-08")
};

export const bekreftetHendelse2 = {
    type: hendelsetyper.AKTIVITETSKRAV_BEKREFTET,
    inntruffetdato: new Date("2017-09-10")
};

export const bekreftetHendelse3 = {
    type: hendelsetyper.AKTIVITETSKRAV_BEKREFTET,
    inntruffetdato: new Date("2017-09-12")
};

export const ukjentHendelse = {
    type: "UKJENT_RANDOM_HENDELSE",
    inntruffetdato: new Date("2017-09-08")  
}

describe("AktivitetskravVarselContainer", () => {

    describe("getAktivitetskravvisning", () => {

        let hendelser;

        it("Skal returnere visning === 'NYTT_AKTIVITETSKRAVVARSEL' dersom det er kommet et nytt varsel", () => {
            hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2]
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(NYTT_AKTIVITETSKRAVVARSEL);
        });

        it("Skal returnere visning === 'INGEN_AKTIVITETSKRAVVARSEL' dersom det ikke finnes noe som helst", () => {
            hendelser = [ukjentHendelse]
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(INGEN_AKTIVITETSKRAVVARSEL);
        });

        it("Skal returnere visning === 'AKTIVITETSVARSELKVITTERING' dersom sist inntrufne varsel er av typen AKTIVITETSKRAV_BEKREFTET ", () => {
            hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, bekreftetHendelse2, bekreftetHendelse3]
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(AKTIVITETSVARSELKVITTERING);
        });

        it("Skal returnere visning === 'AKTIVITETSVARSELKVITTERING' dersom sist inntrufne varsel er av typen AKTIVITETSKRAV_BEKREFTET ", () => {
            hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, varselHendelse2, bekreftetHendelse3, bekreftetHendelse2]
            const visning = getAktivitetskravvisning(hendelser);
            expect(visning).to.equal(AKTIVITETSVARSELKVITTERING);
        });

    });

});

describe("mapStateToProps", () => {

    let state;

    beforeEach(() => {
        state = {
            ledetekster: {},
            hendelser: {},
        };
    });

    it("Skal returnere inntruffetDato på siste relevante hendelse når det er en bekreftet hendelse", () => {
        const hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, varselHendelse2, bekreftetHendelse3, bekreftetHendelse2];
        state.hendelser.data = hendelser;
        const props = mapStateToProps(state);
        expect(props.bekreftetdato).to.deep.equal(bekreftetHendelse3.inntruffetdato);
    });

    it("Skal returnere inntruffetDato på siste relevante hendelse når den er et varsel", () => {
        const hendelser = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, varselHendelse2, bekreftetHendelse2];
        state.hendelser.data = hendelser;
        const props = mapStateToProps(state);
        expect(props.varseldato).to.deep.equal(varselHendelse2.inntruffetdato);
    });

})