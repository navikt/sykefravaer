

export default function getFilteredRules(smSykmelding) {
    return smSykmelding.behandlingsutfall.ruleHits.filter((rule) => {
        return rule.ruleStatus == null || rule.ruleStatus === 'INVALID';
    });
}
