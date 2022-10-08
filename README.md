# Welcome to the Group Buddies Repository!

## Group Buddies
Group Buddies Application (a SDS project)

#### Group 4 (Dream Team) Team Members
* Nicholas Finos
* Grace Billiris
* Yeran Hettiarachchy
* Luka Ryan
* Ashish Chadha
* Jerome Sario
* Lachlan Sinclair

#### Setting Up The Application
**Steps**
<br/>
1. Clone the repository
2. Open the folder in an IDE (preferably Visual Studio Code)
3. Open `Mongodb Compass`
4. Make sure there is no database named 'GroupBuddies'
5. In the IDE terminal: `npm install` (make sure the `node_modules` folder appears in your IDE Explorer)
6. Split your IDE Terminal
7. In one terminal type: `npm start`. This will start the Web Application on `http:localhost:3000`
8. In the other terminal type: `node server.js`. This will start the Backend on `http:localhost:8080`

**MongoDB**
<br/>
Use the Connection String: `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false` to connect to the GroupBuddies database

## Using the Application
**How to Run the Program**
Go to line 1023 in server.js

  1. Delete GroupBuddies Collection 
  2. Uncomment "settingUpProfiles();" and run node server.js
  3. Comment "settingUpProfiles"
  4. Uncomment "addingToTutorials();" and run node server.js
  5. Comment "addingToTutorials();"
**Group Buddies Personnel Login Details**
<br/>
_Student_
<br/>
username: `student`
<br/>
password: `student`
<br/>
_Tutor_
<br/>
username: `tutor`
<br/>
password: `tutor`
<br/>
<br/>
_Subject Coordinator_
<br/>
username: `subjectcoordinator`
<br/>
password: `subcord`
<br/>
<br/>