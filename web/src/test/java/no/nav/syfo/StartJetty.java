package no.nav.syfo;

import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static no.nav.modig.core.test.FilesAndDirs.WEBAPP_SOURCE;
import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class StartJetty {
    public static final int PORT = 8181;
    private static final Logger logger = LoggerFactory.getLogger(StartJetty.class);

    public static void main(String[] args) throws Exception {
        configureLocalConfig();
        Jetty jetty = usingWar(WEBAPP_SOURCE)
                .at("/syfofront")
                .port(PORT)
                .buildJetty();
        logger.info("http://127.0.0.1:" + PORT + "/syfofront");
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

    private static void configureLocalConfig() {
        System.setProperty("dialogarena.cms.url", "https://appres-t10.nav.no");
        //System.setProperty("soknadsapi.url", "http://localhost:8181/sendsoknad");
    }
}
