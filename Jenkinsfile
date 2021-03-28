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
        
        
    }
}
