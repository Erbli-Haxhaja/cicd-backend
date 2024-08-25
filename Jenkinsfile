#!groovy

pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 5, unit: 'MINUTES')
  }

  environment {
    NODE_ENV="production"
    dockerImage = ''
    registry = 'eeba19/cicd-backend'
  }
  stages {
    stage('SCM') {
      steps {
        checkout scm
      }
      post {
        failure {
          script {
            sendFailureEmail('SCM')
          }
        }
      }
    }
    stage('Linting') {
      steps {
        script {
          def scannerHome = tool 'Sonarqube';
          withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Linting')
          }
        }
      }
    }
    stage('Static Code Analysis - Snyk') {
      steps {
        script {
          snykSecurity(
            snykInstallation: 'snyk@latest',
            snykTokenId: 'SNYK_TOKEN',
            failOnIssues: false,
          )
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Static Code Analysis - Snyk')
          }
        }
      }
    }
    stage('Testing') {
      steps {
        script {
          echo 'Testing Stage'
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Testing')
          }
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          //app = docker.build("cicd/test")
          dockerImage = docker.build registry
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Build Docker Image')
          }
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {            
            dockerImage.push("${env.BUILD_NUMBER}")            
            dockerImage.push("latest")   
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Push Docker image')
          }
        }
      }
    }
    stage('Deploy App') {
      steps {
        script {
          echo "Deploying app..."
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Deploy App')
          }
        }
      }
    }
  }
  }

def sendFailureEmail(String stageName) {
  emailext body: "The '${stageName}' stage in the Jenkins pipeline has failed. Please check the details.",
          recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Pipeline Failure: ${stageName} Stage"
}
