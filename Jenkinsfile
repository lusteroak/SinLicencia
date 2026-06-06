pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    tools {
        maven "mvn"
        nodejs "node"
    }
    environment {
        RENDER_API_KEY = credentials('render-api-key')
        RENDER_BACKEND_SERVICE_ID = 'srv-d8hlqj5ckfvc73at7f10'
        RENDER_BACKEND_DEPLOY_HOOK = "https://api.render.com/deploy/${RENDER_BACKEND_SERVICE_ID}?key=Jev3fsmzw2s"
        RENDER_FRONTEND_SERVICE_ID = 'srv-d8hltgbbc2fs739dms9g'
        RENDER_FRONTEND_DEPLOY_HOOK = "https://api.render.com/deploy/${RENDER_FRONTEND_SERVICE_ID}?key=wWc4y7p9njc"
    }
    stages {
        stage('Checkout') {
            steps {
            git branch: 'main', credentialsId: 'Git token', url: 'https://github.com/lusteroak/SinLicencia.git'
          }
        }
       stage('Build') {
                        parallel {
                            stage('Java') {
                                steps {
                                    dir('SinLicenciaBackend') {
                                        sh 'mvn clean install'
                                    }
                                }
                            }

                            stage('Angular') {
                                steps {
                                    dir('SinLicenciaFrontEnd') {
                                        sh 'npm install'
                                        sh './node_modules/.bin/ng build --configuration production'
                                    }
                                }
                            }
                        }
       }
       stage('Test') {
            steps {
                script {
                    sh 'cd SinLicenciaBackend && mvn test'
                }
            }
       }
        stage('Deploy to Render') {
            steps {
                script {


                    def changedFiles = sh(script: 'git diff --name-only HEAD HEAD~1', returnStdout: true).split('\n');
                    echo "Changed files:\n${changedFiles.join('\n')}"

                    def backendChanged = changedFiles.any {
                        it.startsWith("SinLicenciaBackend/") || it == "Dockerfile" || it == "Jenkinsfile"
                    }

                    def frontendChanged = changedFiles.any {
                        it.startsWith("SinLicenciaFrontEnd/") || it == "Dockerfile" || it == "Jenkinsfile"
                    }

                    if(backendChanged) {
                        echo "Changes detected in backend. Deploying backend....."
                        def backendResponse = httpRequest(
                                url: "${RENDER_BACKEND_DEPLOY_HOOK}",
                                httpMode: 'POST',
                                validResponseCodes: '200:299'
                        )
                        echo "Render Backend API Response: ${backendResponse}"
                    } else {
                        echo "No backend changes detected. Skipping backend deployment."
                    }

                    if(frontendChanged) {
                        echo "Changes detected in frontend. Deploying frontend....."
                        def frontendResponse = httpRequest(
                                url: "${RENDER_FRONTEND_DEPLOY_HOOK}",
                                httpMode: 'POST',
                                validResponseCodes: '200:299'
                        )
                        echo "Render Frontend API Response: ${frontendResponse}"
                    } else {
                        echo "No frontend changes detected. Skipping frontend deployment."
                    }
                }
            }
        }
    }
    post {
        success {
            // Actions after the build succeeds
            echo 'Build was successful!'
        }
        failure {
            // Actions after the build fails
            echo 'Build failed. Check logs.'
        }
    }
}