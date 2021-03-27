pipeline {
    agent {
        docker {
            image 'node:11.0.0' 
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
