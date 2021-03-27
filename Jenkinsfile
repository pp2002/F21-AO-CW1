pipeline {
    agent {
        docker {
            image 'node:11-slim' 
            args '-p 3002:3002' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}