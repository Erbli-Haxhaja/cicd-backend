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
    stage('Email Jenkins Pipeline') {
      steps {
        mail bcc: '', body: 'Hello, This is an email from jenkins pipeline.', cc: '', from: '', replyTo: '', subject:​​ 'EmailJenkinsPipeline', to: 'sskg12035@gmail.com'
      }
    }
    }

    // stage('SCM') {
    //   steps {
    //     checkout scm
    //   }
    // }
    // stage('Linting') {
    //   steps {
    //     script {
    //       def scannerHome = tool 'Sonarqube';
    //       withSonarQubeEnv() {
    //         sh "${scannerHome}/bin/sonar-scanner"
    //       }
    //     }
    //   }
    // }
    // stage('Testing') {
    //   steps {
    //     script {
    //       echo 'A/B Testing Stage'
    //     }
    //   }
    // }
    // stage('Build Docker Image') {
    //   steps {
    //     script {
    //       //app = docker.build("cicd/test")
    //       dockerImage = docker.build registry
    //     }
    //   }
    // }
    // stage('Push Docker Image') {
    //   steps {
    //     script {
    //       docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {            
    //         dockerImage.push("${env.BUILD_NUMBER}")            
    //         dockerImage.push("latest")   
    //       }
    //     }
    //   }
    // }
    // stage('Deploy App') {
    //   steps {
    //     script {
    //       echo "Deploying app..."
    //     }
    //   }
    // }
  }