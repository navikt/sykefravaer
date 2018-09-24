gitUrl="https://github.com/navikt/sykefravaer.git"
applikasjonsNavn="sykefravaer"
sone="sbs"

import java.text.SimpleDateFormat

pusDockerImagePrefiks = "docker.adeo.no:5000/pus/"
nodeDockerImage = "${pusDockerImagePrefiks}node"
deployDockerImage = "${pusDockerImagePrefiks}deploy"
digisyfooDockerImagePrefiks = "docker.adeo.no:5000/digisyfo"

miljo = "q1"
environmentFile = "__build-environment__"

gitCommitHash = null
versjon = null

def addToDescription(message) {
    echo "adding to description : ${message}"
    def description = currentBuild.description ?: ""
    currentBuild.description = description != null && description.trim().length() > 0 ? "${description}<br>${message}" : message
}


def httpsGithubCom = "https://github.com"
if (gitUrl.contains(httpsGithubCom)) {
   gitUrl = gitUrl.replace(httpsGithubCom, "https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com")
}

def cleanup() {
    stage("cleanup") {
        // docker-containere kan potensielt legge igjen filer eid av root i workspace
        // trenger å slette disse som root
        // samtidig er det et poeng å slette node_modules slik at vi får mer konsistente bygg
        sh("docker run" +
                " --rm" + // slett container etter kjøring
                " -v ${workspace}:/workspace" + // map inn workspace
                " ${nodeDockerImage}" +
                " chmod -R 777 /workspace"
        )
        deleteDir()
    }
}

node("docker") {
    nodeName = env.NODE_NAME
    echo "running on ${nodeName}"

    cleanup()

    stage("checkout") {
        sh "git clone -b ${branch} ${gitUrl} ."


        gitCommitHash = sh(returnStdout: true, script: "git rev-parse HEAD").trim()
        def gitCommitHashShort = gitCommitHash.substring(0, 8)
        addToDescription("Commit: ${gitCommitHashShort}")

        def environment = """
BUILD_URL=${BUILD_URL}
buildUrl=${BUILD_URL}
applikasjonsNavn=${applikasjonsNavn}
miljo=${miljo}
testmiljo=${miljo}
domenebrukernavn=${domenebrukernavn}
domenepassord=${domenepassord}
sone=${sone}
http_proxy=${http_proxy}
https_proxy=${https_proxy}
no_proxy=${no_proxy}
gitUrl=${gitUrl}
gitCommitHash=${gitCommitHash}
"""
        println(environment)
        writeFile([
                file: environmentFile,
                text: environment
        ])

        date = new Date()
        dateFormat = new SimpleDateFormat("dd.MM.HHmm")

        versjon = dateFormat.format(date) + "-${gitCommitHashShort}"

        echo "Build version: ${versjon}"
        addToDescription("Version: ${versjon}")
    }

    def uversjonertTag = "${digisyfooDockerImagePrefiks}/${applikasjonsNavn}"
    def versjonertTag = "${uversjonertTag}:${versjon}"

    stage("docker build") {
        dir ('web/src/frontend') {
            sh("npm install")
            sh("npm run test")
            sh("npm run nais-build")
            sh("mkdir docker")
            sh("cp -r dist ../../../.")
            sh("cp .env ../../../.")
            sh("cp server.js ../../../.")
            sh("cp decorator.js ../../../.")
            sh("cp settings.json ../../../.")
            sh("cp package.json ../../../.")
        }

        sh("docker build" +
                " --no-cache" +
                " --pull" + // alltid bruk siste versjon av baseimages
                " --build-arg BASE_IMAGE_PREFIX=${pusDockerImagePrefiks}" +
                " -t ${uversjonertTag}" +
                " -t ${versjonertTag}" +
                " .")
    }

    stage("docker push") {
        sh("docker push ${versjonertTag}")
        sh("docker push ${uversjonertTag}")
    }

    stage("nais deploy ${miljo}") {
        sh("docker pull ${deployDockerImage}")
        sh("docker run" +
                " --rm" +  // slett container etter kjøring
                " --env-file ${environmentFile}" +
                " -v ${workspace}:/workspace" + // map inn workspace
                " -w /workspace" + // sett working directory
                " -e plattform=nais" +
                " -e versjon=${versjon}" +
                " ${deployDockerImage}"
        )
    }

    cleanup()
}
