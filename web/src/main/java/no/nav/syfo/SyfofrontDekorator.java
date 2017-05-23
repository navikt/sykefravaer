package no.nav.syfo;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class SyfofrontDekorator extends DecoratorFilter {
    private static final String FRAGMENTS_URL = "common-html/v4/navno";
    private static final String APPLICATION_NAME = "syfofront";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES= new ArrayList<>(asList("webstats-ga-notrack", "header-withmenu", "footer-withmenu", "styles", "scripts", "skiplinks", "megamenu-resources"));

    public SyfofrontDekorator() {
        super();
        setFragmentsUrl(FRAGMENTS_URL);
        setContentRetriever(setUpContentRetriever());
        setApplicationName(APPLICATION_NAME);
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        setFragmentNames(FRAGMENT_NAMES);
    }

    private EnonicContentRetriever setUpContentRetriever() {
        EnonicContentRetriever contentRetriever = new EnonicContentRetriever(10000);
        contentRetriever.setBaseUrl(System.getProperty("dialogarena.cms.url"));
        contentRetriever.setRefreshIntervalSeconds(1800);
        return contentRetriever;
    }
}
