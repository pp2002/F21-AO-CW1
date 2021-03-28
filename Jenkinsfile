pipeline {
    
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
