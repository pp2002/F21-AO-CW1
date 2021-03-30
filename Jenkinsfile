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
        
        stage('Deploying into k8s'){
            steps{
                bat 'kubectl apply -f deployment.yaml' 
                bat 'kubectl expose deployment f21ao-cw2 --type=NodePort --name=service'
                jiraSendDeploymentInfo environmentId: 'prod-localhost', environmentName: 'localhost production', environmentType: 'development', issueKeys: ['FA21'], serviceIds: [''], site: 'f21ao-cw-dev.atlassian.net', state: 'successful'
            }
        }
        
        
    }
}
