pipeline {
    agent any
    
    stages {
        stage('Build') { 
            steps {
                withTool('nodejs')
                sh 'npm install'
            }
        }
    }
}
