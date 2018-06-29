gitUrl="ssh://git@stash.devillo.no:7999/syfo/syfofront.git"
branch="node-server"
applikasjonsNavn="syfofront"
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

        def timestamp = new SimpleDateFormat("yyyyMMdd.Hmm").format(new Date())
        def gitCommitNumber = sh(returnStdout: true, script: "git rev-list --count HEAD").trim()
        versjon = "${gitCommitNumber}.${timestamp}"

        echo "Build version: ${versjon}"
        addToDescription("Version: ${versjon}")
    }

    def uversjonertTag = "${digisyfooDockerImagePrefiks}${applikasjonsNavn}"
    def versjonertTag = "${uversjonertTag}:${versjon}"

    stage("docker build") {
        dir ('web/src/frontend') {
            sh("npm install")
            sh("npm run nais-build")
            sh("mkdir docker")
            sh("cp -r dist docker/")
            sh("cp .env docker/")
            sh("cp server.js docker/")
            sh("cp settings.json docker/")
            sh("cp package.json docker/")
            sh("cp .npmrc docker/")

            sh("cp -r docker/* ../../../.")
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