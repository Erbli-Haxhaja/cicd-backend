#!groovy

pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 5, unit: 'MINUTES')
  }

  environment {
    NODE_ENV="production"
  }

  stages {
    stage('SCM') {
      steps {
        checkout scm
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
    }
    stage('Testing') {
      steps {
        script {
          echo 'A/B Testing Stage'
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          echo 'Building Docker Image'
          app = docker.build("erbli/test")
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        script {
          echo 'Pushing Docker Image to Docker Hub'
        }
      }
    }
  }
}