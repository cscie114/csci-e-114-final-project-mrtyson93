## Final Project: CSCI E-114, Spring 2024
**Site URL: [https://cscie114-final-project-mrtyson.netlify.app/](https://cscie114-final-project-mrtyson.netlify.app/)**

**Project Background/Info:**

For this final project I have created a simple note taking app. The "extraordinary distinction" portion of this app is the AWS API Gateway backed by Lambda function and DynamoDB that stores and interacts with the data that populates this website. To create this API, I followed this [tutorial](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) on creating the necessary resources within the aws console to create the API. After that, I modified the lambda function code to allow for note taking functions. The code in that lambda can be seen in the root repository of this project in the file ```lambda_function.py```. 

I created four API endpoints. They are as follows.

```POST /user```: Creates a user from a username in POST body.

```GET /notes/{user}```: Gets all notes for a specifiec user.

```POST /notes/{user}```: Creates a note for a specific user.

```DELETE /notes/{user}/{noteid}```: Deletes a specfific note tied to a user.

There's no true "sign up" for this site. The first page has you enter a username to login, the logic simply creates a new one if one doesn't already exist. After logging in, it will take you to a page where you can see the notes that are stored in DynamoDB and add and remove notes as desired.

I also gained some experience using React Material UI Components. 

### Installation and Running Directions
Follow the below directions to get this repo up and running with a local Gatsby website .

#### Step 1: Checkout this repo

Using your preferred method of checking out a github repo, checkout this repo to your local computer.
My favorite is by running the following command:

```git clone https://github.com/cscie114/csci-e-114-final-project-mrtyson93.git```

#### Step 2: Install local requirements

In the terminal of your choice, run the following two commands in the root directory of this repo to install the requisite packages needed to run the website:

```npm install```

This assumes you already have node 18 or higher installed, if you do not, you can install following directions [here](https://nodejs.org/en/download/package-manager)

#### Step 3: Run the website

Start the website locally by running the following command in the root directory of this repo:
 
 ```gatsby develop```

You should now be able to access the website locally at [http://localhost:8000/](http://localhost:8000/)