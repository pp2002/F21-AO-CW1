pipeline {
    environment {
    registry = "pp2002/f21ao"
    registryCredential = 'dockerhub_id'
    dockerImage = ''
  }
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
                    dockerImage = docker.build registry + ":latest"
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
