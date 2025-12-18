pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/raghur4567/todo-fullstack-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                bat 'cd backend && mvn clean package -DskipTests'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    '''
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                bat 'docker build -t raghureddydoc/todo-backend:latest backend'
            }
        }

        stage('Docker Build Frontend') {
            steps {
                bat 'docker build -t raghureddydoc/todo-frontend:latest frontend'
            }
        }

        stage('Docker Push Backend') {
            steps {
                bat 'docker push raghureddydoc/todo-backend:latest'
            }
        }

        stage('Docker Push Frontend') {
            steps {
                bat 'docker push raghureddydoc/todo-frontend:latest'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}