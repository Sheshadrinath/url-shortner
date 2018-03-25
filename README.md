# url-shortner

The goal of this tool is to provide the URL shortner service when hosted. User can configure the short url against the full URL in the mapping.json file. When request is received against the key, then the application will redirect the request to the configured webiste.

# Installation and working with this app
Please follow the step-by-step installation and hosting instructions.

## Confguring from static list
1. Clone the application from the Git repository https://github.com/Sheshadrinath/url-shortner.git
2. Make sure you have installed nodejs. If not, please install NodeJs from https://nodejs.org/. You may install the latest and stable version.
3. Once you extract the code after downloading from the above git repository, please find the file *mapping.json* inside *src* folder. Update your mappings as necessary.
4. After cloing this repository, open NodeJs command prompt (Windows) or terminal (Mac) and navigate to this folder until you see folder src
5. Enter command `npm install`. This command will install all necessary packages
6. After successful installation of node packages, in the command prompt or terminal, please enter the command `node app.js` to start the server.
7. From the browser's URL enter the address http://localhost:3000?q=jfkldsajf for testing. Please note that we are using the port 3000 in *app.js* file. Please change the port in *app.js* file if required to any necessary number.
8. If the mapping is not available from the static or configured list, then error 404 is thrown back to user.

# Roadmap
Currently this application uses the static mapping as you can see in the mapping.json file. But in coming days, we will be providing support to:
1. To add mapping by providing the user interface where user can add/edit/remove mappings. This will avoid user to manipulate the JSON mapping file manually. 
2. We will also provide support to fetch the mappings from cache server (both internal or external) too if configured.