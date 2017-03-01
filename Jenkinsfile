#!groovy
@Library('common')
import common

def common = new common()
def releaseVersion, commitHash, pomVersion, buildNr
def commiter, committerEmail, lastcommit
def application = "syfofront"

def t4 = "t4"
def t4_kode = "16560"

def t1_kode = "16557"

def notifyFailed(reason, error) {
    changelog = common.getChangeString()
    mattermostSend color: 'RED', message: "syfofront pipeline feilet: ${reason} \n\n${changelog}", channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
    throw error
}

node {
    common.setupTools("Maven 3.3.3", "java8")

    stage('Setup') {
        def pom = readMavenPom file: 'pom.xml'

        commiter = sh(script: 'git log -1 --pretty=format:"%ae (%an)"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        lastcommit = sh(script: 'git log -1 --pretty=format:"%ae (%an) %h %s"', returnStdout: true).trim()

        pomVersion = pom.version.tokenize("-")[0]
        buildNr = env.BUILD_NUMBER
        commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        releaseVersion = pomVersion + "." + buildNr + "-" + commitHash
    }

    stage('Checkout') {
        git "ssh://git@stash.devillo.no:7999/syfo/${application}.git"
    }

    stage('Build (java)') {
        mattermostSend color: 'GREEN', message: "Pipeline starter - ${application}:${releaseVersion}", channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
        try {
            sh "mvn clean install"
        } catch (Exception e) {
            notifyFailed("Bygg feilet", e)
        }
    }

    stage('Set Version') {
        script {
            def pom = readMavenPom file: 'pom.xml'

            commiter = sh(script: 'git log -1 --pretty=format:"%ae (%an)"', returnStdout: true).trim()
            committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
            lastcommit = sh(script: 'git log -1 --pretty=format:"%ae (%an) %h %s"', returnStdout: true).trim()

            pomVersion = pom.version.tokenize("-")[0]
            buildNr = env.BUILD_NUMBER
            commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
            releaseVersion = pomVersion + "." + buildNr + "-" + commitHash
            sh "mvn versions:set -B -DnewVersion=${releaseVersion} -DgenerateBackupPoms=false"
        }
    }

    stage('Deploy nexus') {
        try {
            sh "mvn -B deploy -DskipTests"
            currentBuild.description = "Version: ${releaseVersion}"
        } catch (Exception e) {
            notifyFailed("Deploy av artifakt til nexus feilet", e)
        }
    }
}

stage("Deploy app til T1") {
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
    stage("Run nightwatch") {
        build job: 'syfosjekker', parameters: [[$class: 'StringParameterValue', name: 'miljo', value: 't1']]
    }

    stage("Log versions in T1") {
        syfofront_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfofront\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syforest_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syforest\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syfoservice_version_t1 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfoservice\\&environment=t1\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)

        print(
            "------------ Versjoner som er testet ------------\n" +
            "Syfofront:   ${syfofront_version}" +
            "Syforest:    ${syforest_version_t1}" +
            "Syfoservice: ${syfoservice_version_t1}" +
            "-------------------------------------------------\n"
        )

        msg = "Fant gyldig configurasjon i T1: syfofront:${syforest_version_t1} syforest:${syforest_version_t1} syfoservice:${syfoservice_version_t1}\n promoterer denne videre til T4!"
        mattermostSend color: 'GREEN', message: msg, channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
    }
}

stage("Deploy apper til T4") {

    callback = "${env.BUILD_URL}input/Deploy/"
    node {
        syfofront_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfofront\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syforest_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syforest\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)
        syfoservice_version_t4 = sh (script: "curl https://vera.adeo.no/api/v1/deploylog?application=syfoservice\\&environment=t4\\&onlyLatest=true | jq .[].version | tr -d '\"'", returnStdout: true)

        if (syfofront_version_t1 != syfofront_version_t4) {
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
    }
}

mattermostSend color: '#4cff28', message: "Nye versjoner ute i T4! Nå kan dere teste @digisyfo.ola @morten", channel: 'town-square', endpoint: 'http://chatsbl.devillo.no/hooks/6mid6fqmqpfk7poss9s8764smw', v2enabled: true
