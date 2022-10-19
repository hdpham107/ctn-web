pipeline {
    agent any

	parameters {
        booleanParam(name: 'Manual', defaultValue: false, description: 'Should deploy branch?')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
			steps {
				echo 'Deploying....'
				script {
					echo "Manual: ${params.Manual}"
					if (params.Manual) {
						sh('sudo /root/jenkins-deploy.sh ${BRANCH_NAME} ui-web')
					}
				}
			}
        }
    }
}
