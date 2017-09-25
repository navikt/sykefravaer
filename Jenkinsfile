#!groovy
@Library('common') import common

def common = new common()
def application = "syfofront"

node {
    checkout scm: [$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'http://stash.devillo.no/scm/syfo/pipeline.git']]]

    def pipeline = load 'pipeline.groovy'
    pipeline.setup(application, common)
    pipeline()
}
