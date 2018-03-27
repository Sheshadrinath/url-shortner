# url-shortner

The goal of this tool is to provide the URL shortner service when hosted. User can configure the short url against the full URL in the mapping.json file. When request is received against the key, then the application will redirect the request to the configured webiste.

# Installation and working with this app
Please follow the step-by-step installation and hosting instructions.

### Dependencies
1. NodeJS
2. Express, Express Router
3. Lodash
4. Body-Parser
5. Mongoose, MongoDB

### Dev Dependencies
None

## Confguration and Execution for Server
1. Clone the application from the Git repository https://github.com/Sheshadrinath/url-shortner.git
2. Make sure you have installed nodejs. If not, please install NodeJs from https://nodejs.org/. You may install the latest and stable version.
3. Once you extract the code after downloading from the above git repository, please find the file *mapping.json* inside *src* folder inside *server* folder. Update your mappings as necessary.
4. After cloing this repository, open NodeJs command prompt (Windows) or terminal (Mac) and navigate to this folder until you see folder src
5. Enter command `npm install`. This command will install all necessary packages
6. After successful installation of node packages, in the command prompt or terminal, please enter the command `node app.js` to start the server.
7. Install MongoDB. Refer to the next section to install MongoDB
8. From the browser's URL enter the address http://localhost:3000?q=google for testing. Please note that we are using the port 3000 in *app.js* file. Please change the port in *app.js* file if required to any necessary number.
9. If the mapping is not available from the static or configured list, then error 404 is thrown back to user.

## Installing MongoDB
1. Please install MongoDb from URL: https://www.mongodb.com/download-center?jmp=nav
2. Download the installer based on your operating system.
3. Once downloaded, please install using the installer. 
4. For Windows:
    - Once installed, please create a folder C:\data\db
    - Open command prompt and navigate to folder C:\Program Files\MongoDB\Server\3.x\bin
    - Select mongod.exe to start the MongoDB
5. For Mac:
    - Check if you have installed `brew` in your mac.
    - If `brew` doesnot exist install the same by entering the command in the terminal `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
    - Once `brew` is installed, enter the next command `brew install mongodb` in the terminal
    - After successful installation create data/db folder by entering the command `mkdir -p /data/db`. If you receive access or permission related issues use `sudo` command.
    - Now enter the command `mongod` in the terminal to start MongoDB server. In the terminal you should also see a message saying `[initandlisten] waiting for connections on port 27017`.

## Adding items to the mapping
There is an API already with this service through which new mapping can be added. Please refer to the *api.js* file for more details. Through Postman, please make a POST call to add a new item to the mapping. Adding new item to the mapping collection does not require any service restart. The service updates it's internal collection also updates the file so that the mappings are not lost when service is restarted.

Open Postman, and make a POST call to http://localhost:3000 with raw body content. Also please remember to send data in JSON format, so please select **JSON(application/json)** while posting the data.

`{
    "from": "nodejs",
    "to": "https://www.nodejs.org",
    "expiry": "2018-04-21 00:00:00"
}`

## Using API's for managing mappings
*API's to manage URL mappings are being developed, will be updated soon!!*

# Starting and configuring Client application
*This is about to come. Development is in progress.*

# Roadmap
Currently this application uses the static mapping as you can see in the mapping.json file. But in coming days, we will be providing support to:
1. To add mapping by providing the user interface where user can add/edit/remove mappings. This will avoid user to manipulate the JSON mapping file manually. 
2. We will also provide support to fetch the mappings from cache server (both internal or external) too if configured.
3. Time-based mappings