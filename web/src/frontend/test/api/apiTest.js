import { expect } from 'chai';
import { get, post, getAjax } from '../../js/api';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';



describe("api", () => {
    describe("get", () => {

        afterEach(() => {
            fetchMock.restore();
        })

        it("Skal kalle på fetch", (done, fail) => {

            fetchMock.get("*", {
                hello: "world"
            });

            get("http://www.nav.no/url").then((data) => {
                expect(data.hello).to.equal("world")
                done();
            });

        });

        it("Skal kalle kaste en 404-exception hvis det returneres 404", (done) => {

            fetchMock.get("*", 404);
            get("/ingen-url").catch((e) => {
                expect(e.message).to.equal("404")
                done();
            });

        });

        it("Skal kalle kaste en exception hvis det returneres > 400", (done) => {

            fetchMock.get("*", 500);
            get("/ingen-url").catch((e) => {
                expect(e.message).to.equal("Det oppstod en feil")
                done();
            });

        });

    });

    describe("post", () => {

        afterEach(() => {
            fetchMock.restore();
        })

        it("Skal returnere et promise", (done) => {

            fetchMock.post("*", {
                hello: "world"
            });

            post("/posturl").then((data) => {
                done();
            })
     
        });

        it("Skal kaste en error hvis det oppstår en feil", (done) => {

            fetchMock.post("*", 500);

            post("/posturl").catch((err) => {
                expect(err.message).to.equal("Forespørsel feilet");
                done();
            });
     
        });


    });

    describe("getAjax", () => {

        let server;

        beforeEach(() => {
            server = sinon.fakeServer.create();
        });

        afterEach(() => {
            server.restore();
        });

        it("Skal returnere promise som resolves ved success (JSON)", (done) => {
            getAjax("/olsen").then((respons) => {
                expect(JSON.parse(respons)).to.deep.equal({"test": "OK"});
                done();
            });
            server.requests[0].respond(200, {
                "Content-Type": "application/json"
            }, JSON.stringify({
                "test": "OK"
            }));
        });

        it("Skal returnere promise som resolves ved success (TEKST)", (done) => {
            getAjax("/olsen").then((respons) => {
                expect(respons).to.deep.equal("Min respons");
                done();
            });
            server.requests[0].respond(200, {
                "Content-Type": "text/plain"
            }, "Min respons");
        });

        it("Skal returnere promise som rejected ved feil", (done) => {
            getAjax("/olsen").catch((a) => {
                done();
            });
            server.requests[0].respond(500);
        });

    })

});