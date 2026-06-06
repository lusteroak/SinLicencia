// This is the Jenkinsfile that will be used to build & test the project.
environment {
        RENDER_API_KEY = credentials('render-api-key')
        // Replace with the backend deploy hook you copied
        RENDER_BACKEND_DEPLOY_HOOK = "https://api.render.com/deploy/srv-d8hlqj5ckfvc73at7f10?key=Jev3fsmzw2s"
        // Replace with the frontend deploy hook you copied
        RENDER_FRONTEND_DEPLOY_HOOK = "https://api.render.com/deploy/srv-d8hltgbbc2fs739dms9g?key=wWc4y7p9njc"
    }

pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    tools {
        maven "mvn"
        nodejs "node"
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
                        echo "Deploying Backend..."
                        def backendResponse = httpRequest(
                            url: "${RENDER_BACKEND_DEPLOY_HOOK}",
                            httpMode: 'POST',
                            validResponseCodes: '200:299'
                        )
                        echo "Render Backend Deployment Response: ${backendResponse}"

                        echo "Deploying Frontend..."
                        def frontendResponse = httpRequest(
                            url: "${RENDER_FRONTEND_DEPLOY_HOOK}",
                            httpMode: 'POST',
                            validResponseCodes: '200:299'
                        )
                        echo "Render Frontend Deployment Response: ${frontendResponse}"
                    }
                }
            }
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