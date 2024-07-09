# CostEstimateWebAdmin

Here's the priority of the files for the development build and the production build (higher priority on the left):

Dev.: (npm start): .env.development.local, .env.local, .env.development, .env

Prod.: (npm run build): .env.production.local, .env.local, .env.production, .env

If you ever want to use something in your local environment without being specific to the development build or the production build, you can add some variables to your .env.local file.

Source : https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used
