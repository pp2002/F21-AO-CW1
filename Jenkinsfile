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
                    bat 'npm install'
                }
                
            }
        }
        
        stage('Test') { 
            steps {
                nodejs('nodejs'){
                    bat 'npm test'
                }
                
            }
        }
        
        
    }
}
