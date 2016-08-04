package no.nav.syfo;

        import no.nav.sbl.dialogarena.common.jetty.Jetty;
        import org.slf4j.Logger;

        import static java.lang.System.setProperty;
        import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
        import static no.nav.modig.lang.collections.RunnableUtils.first;
        import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
        import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
        import static no.nav.sbl.dialogarena.test.path.FilesAndDirs.WEBAPP_SOURCE;
        import static org.slf4j.LoggerFactory.getLogger;

public class StartJetty {
    private static final int PORT = 8181;
    private static final Logger logger = getLogger(StartJetty.class);

    public static void main(String[] args) throws Exception {
        configureLocalConfig();
        Jetty jetty = usingWar(WEBAPP_SOURCE)
                .at("/sykefravaer")
                .port(PORT)
                .buildJetty();
        logger.info("http://127.0.0.1:" + PORT + "/sykefravaer");
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

    private static void configureLocalConfig() {
        setProperty("dialogarena.cms.url", "https://appres-t10.nav.no");
        setProperty("sykefravaerapi.url", "http://localhost:8182/syforest");
    }
}
