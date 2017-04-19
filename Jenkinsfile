#!groovy
@Library('common')
import common

def common = new common()
def releaseVersion, commitHash, pomVersion, buildNr
def commiter, committerEmail, lastcommit
def application = "syfofront"

def t4_kode = "16560"
def t1_kode = "16557"
def GREEN = "#4cff28"

def notifyFailed(reason, error) {
    mattermostSend color: '#fc3535', message: "syfofront pipeline feilet: ${reason}", channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
    throw error
}

def changelog(commitHash) {
    def prodVersion = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfofront\\&environment=p\\&onlyLatest=true | jq .[].version | tr -d '\"' | tr -d '\\n'", returnStdout: true)

    def oldCommit = prodVersion
    def newCommit = commitHash
    def keyword = "SYFOUTV"

    def log = sh (script: "git log ${oldCommit}...${newCommit} --grep=${keyword} --reverse --pretty=format:\"- %s (%an, %ar: %h)\" | grep -v Merge", returnStdout: true)
    return log
}

node {
    common.setupTools("Maven 3.3.3", "java8")

    stage('Bygger app') {

        git "ssh://git@stash.devillo.no:7999/syfo/${application}.git"

        def pom = readMavenPom file: 'pom.xml'

        commiter = sh(script: 'git log -1 --pretty=format:"%ae (%an)"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        lastcommit = sh(script: 'git log -1 --pretty=format:"%ae (%an) %h %s"', returnStdout: true).trim()

        pomVersion = pom.version.tokenize("-")[0]
        buildNr = env.BUILD_NUMBER
        commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        releaseVersion = pomVersion + "." + buildNr + "-" + commitHash
        sh "mvn versions:set -B -DnewVersion=${releaseVersion} -DgenerateBackupPoms=false"

        mattermostSend color: GREEN, message: "Pipeline starter - ${application}:${releaseVersion}\n\n ${common.getChangeString()}", channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
        try {
            sh "mvn clean deploy"
            currentBuild.description = "Version: ${releaseVersion}"
            sh "git tag ${releaseVersion} ${commitHash}; git push --tags"
        } catch (Exception e) {
            notifyFailed("Bygg/deploy til Nexus feilet", e)
        }
    }

    stage('Sjekker kvalitet (Sonar)') {
        withSonarQubeEnv('SBL sonar') {
            try {
                sh "mvn ${SONAR_MAVEN_GOAL} -Dsonar.host.url=${SONAR_HOST_URL}"
            } catch(Exception e) {
                notifyFailed("Sonar feilet", e)
            }
        }
    }
}

stage("Deployer til T1") {
    callback = "${env.BUILD_URL}input/Deploy/"
    node {
        def deploy = common.deployApp('syfofront', releaseVersion, "${t1_kode}", callback, commiter).key
        try {
            timeout(time: 15, unit: 'MINUTES') {
                input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
            }
        } catch (Exception e) {
            msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
            notifyFailed(msg, e)
        }
    }
}

node {
    stage("Funker det?") {
        def sjekker = build job: 'syfosjekker', propagate: false, parameters: [[$class: 'StringParameterValue', name: 'miljo', value: 't1']]

        print(sjekker.result)
        if (sjekker.result != 'SUCCESS'){
            notifyFailed("Syfosjekker feilet test i T1!", null)
        }
    }
}

stage("Deployer til T4") {
    node {
        syfofront_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfofront\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syforest_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syforest\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syfoservice_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfoservice\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syfotekster_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfotekster\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)

        print(
            "------------ Versjoner som er testet ------------\n" +
            "Syfofront:   ${syfofront_version_t1}" +
            "Syforest:    ${syforest_version_t1}" +
            "Syfoservice: ${syfoservice_version_t1}" +
            "Syfotekster: ${syfotekster_version_t1}" +
            "-------------------------------------------------\n"
        )

        msg = "Fant gyldig kombinasjon av appene i T1 og promoterer disse videre til T4!\n - syfofront:${syfofront_version_t1}\n - syforest:${syforest_version_t1}\n - syfoservice:${syfoservice_version_t1}\n - syfotekster:${syfotekster_version_t1}"
        mattermostSend color: GREEN, message: msg, channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
    }

    callback = "${env.BUILD_URL}input/Deploy/"
    node {
        syfofront_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfofront\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syforest_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syforest\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syfoservice_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfoservice\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syfotekster_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfotekster\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)

        if (syfofront_version_t1 != syfofront_version_t4) {
            print("Deployer syfofront:${syfofront_version_t1} til T4")
            def deploy = common.deployApp('syfofront', syfofront_version_t1, "${t4_kode}", callback, commiter).key

            try {
                timeout(time: 15, unit: 'MINUTES') {
                    input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
                }
            } catch (Exception e) {
                msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
                notifyFailed(msg, e)
            }
        }

        if (syforest_version_t1 != syforest_version_t4) {
            print("Deployer syforest:${syforest_version_t1} til T4")
            def deploy = common.deployApp('syforest', syforest_version_t1, "${t4_kode}", callback, commiter).key

            try {
                timeout(time: 15, unit: 'MINUTES') {
                    input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
                }
            } catch (Exception e) {
                msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
                notifyFailed(msg, e)
            }
        }

        if (syfoservice_version_t1 != syfoservice_version_t4) {
            print("Deployer syfoservice:${syfoservice_version_t1} til T4")
            def deploy = common.deployApp('syfoservice', syfoservice_version_t1, "${t4_kode}", callback, commiter).key

            try {
                timeout(time: 15, unit: 'MINUTES') {
                    input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
                }
            } catch (Exception e) {
                msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
                notifyFailed(msg, e)
            }
        }

        if (syfotekster_version_t1 != syfotekster_version_t4) {
            print("Deployer syfotekster:${syfotekster_version_t1} til T4")
            def deploy = common.deployApp('syfotekster', syfotekster_version_t1, "${t4_kode}", callback, commiter).key

            try {
                timeout(time: 15, unit: 'MINUTES') {
                    input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
                }
            } catch (Exception e) {
                msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
                notifyFailed(msg, e)
            }
        }
    }
}

node {
    mattermostSend color: GREEN, message: "Nye versjoner ute i T4!\n\nChangelog:\n${changelog(commitHash)}", channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
}
