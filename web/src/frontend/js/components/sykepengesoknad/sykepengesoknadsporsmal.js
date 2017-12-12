[{
    sporsmalstekst: "Har du hatt ferie...",
    svartekst: "Ja",
    verdi: true,
    type: "checkbox"
    undersporsmal: [{
        sporsmalstekst: "Jeg har...",
        svar: [{
            svartekst: "oppholdt meg utenfor Norge",
            verdi: true,
            type: "checkbox",
        },
        {
            svartekst: "hatt ferie",
            verdi: true,
            type: "checkbox",
        },
        {
            svartekst: "hatt permisjon",
            verdi: true,
            type: "checkbox",
        }],
        undersporsmal: [{
            { 
                sporsmalstekst: "Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?",
                svartekst: "Ja",
                svar: [{
                    verdi: "Ja",
                    type: "radioknapp"
                }]
            }]
                type: "periode"
                svar: [{
                    svartekst: "20.01.2017 - 22.01.2017",
                    verdi: {
                        fom: "2017-01-20",
                        tom: "2017-01-22"
                    },
                }]
            }
    }]
}]

sporsmalstekst: string,
svar: {
    svartekst: string,
    verdi: Object
    type: enum,    
}
undersporsmal: [],

[{
    spmTekst: "Har du hatt ferie, permisjon eller oppholdt deg...", 
    svar: [{
        verdi: true,
        tekst: "Ja",
    }],
    sporsmal: {
        spmTekst: "Jeg har...",
        type: "multi",
        svar: [{
            verdi: true,
            tekst: "hatt ferie"
        }, {
            
        }]
    }
}]