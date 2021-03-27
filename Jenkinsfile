pipeline {
    agent any
    
    stages {
        stage('Build') { 
            steps {
                nodejs('nodejs'){
                    sh 'npm install'
                }
                
            }
        }
        
        stage('Test') { 
            steps {
                nodejs('nodejs'){
                    sh 'npm test'
                }
                
            }
        }
        
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }
    }
}
