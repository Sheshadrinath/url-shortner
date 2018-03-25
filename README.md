# url-shortner

The goal of this tool is to provide the URL shortner service when hosted. User can configure the short url against the full URL in the mapping.json file. When request is received against the key, then the application will redirect the request to the configured webiste.

# Roadmap
Currently this application uses the static mapping. In the next phase, support will be added by providing the user interface where user can create more mappings. This will avoid user to manipulate the JSON mapping file manually. We are also thinking to provide support to fetch the mappings from cache server too if configured.

# Installation and working with this app
Please follow the step-by-step installation and hosting instructions.

## Confguring from static list
1. Clone the application from the Git repository
2. Make sure you have installed nodejs. If not, please install NodeJs from https://nodejs.org/. You may install the latest and stable version.
3. Once you extract the code after downloading from the above git repository, please find the file mapping.json inside src folder. Update your mappings as necessary.
4. After cloing this repository, open NodeJs command prompt (Windows) or terminal (Mac) and navigate to this folder until you see folder src
5. Enter command 'npm install'. This command will install all necessary packages
6. After successful installation of node packages, in the command prompt or terminal, please enter the command 'node app.js' to start the server.