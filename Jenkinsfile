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
      checkout scm
    }
    stage('Linting') {
      def scannerHome = tool 'Sonarqube';
      withSonarQubeEnv() {
        sh "${scannerHome}/bin/sonar-scanner"
      }
    }
  }
}
