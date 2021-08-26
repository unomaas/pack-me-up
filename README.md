# Pack Me Up - Ryan's Solo Project

Thanks for looking into my solo project, the Pack Me Up web app! 



## Description:

Duration: 2 Week Sprint

This is a web based application that uses React to interact with a virtual server and database.  The objective was to get hands-on experience working with React to build a full-stack app using CRUD methodology.  

The app functionality is meant to simplify the packing and tracking of different user-defined buckets that they frequently travel with.  It will allow the user to create different buckets of items they frequently travel with, and prompt them to start packing these items when they indicate they're ready to.   

For example, a user who goes camping a lot could wish to create a packing list for their tent and gear.  They would make a "tent" kit, and create items to be attached to this kit.  Then they would create a "camping" event, and attach the tent kit to this.  Then when they go to pack, they'd select the camping event and the app will prompt them to check off all items for every related kit.

This project was designed for myself and people close to me, who all attend Cosplay Conventions, and frequently need to keep track of different outfits and each item with it when we travel.  However, I wanted this app to be usable by all -- so I left the naming of kits and events open-ended, to be user-defined, to expand the possibilities. 

This project was initially a 2-week sprint as one of my finals for my software school, Prime Digital Academy, but I will be continuing to update it's useability and add features for myself and friends to use.  Ideally I would love to deploy this to the public someday. 



## Prerequisites:

- Node.js: https://nodejs.org/en/

- PostgreSQL: https://www.postgresql.org/



## Installation:

To run this program, you will need to:

- [] Build the database in your SQL server with the code in "database.sql" file. 

- [] Run 'npm install' in your terminal to install the dependencies.

- [] Run 'npm run server' in one terminal, and 'npm run client' in another terminal.



## Usage:

- #1. To use this app, start the server and client in your terminal.  React will navigate to http://localhost:3000/ in your browser.  

- #2. The app will require the user to register, and then take them to the dashboard.  

- #3. A user should start with creating different kits.  Upon creating, those kits will be populated on their dashboard.  They're able to see the detailed view by clicking on them, and adding items.  

- #4. Then the user should do the same with creating an event, clicking on it in the dashboard, and attaching kits to bring to it.

- #5. When ready to pack, the user will click the Packing button, which will prompt them to select the event, and then populate every kit attached to that event.  From there, the user can cross off each item as packed, and when ready, click the button to start the trip. 



### Accessibility: 

I strive to make my apps accessible to all!  

This specific app is dyslexia-friendly, with a custom font, "OpenDyslexia", added to the server. 


### Built With:

JavaScript/HTML/CSS, React, Redux, Redux Saga, React Router, Passport, Node.js, Express, SQL, Material-ui, Axios, PG. 



### Acknowledgement:

I'd like to give thanks to Dane Smith, and everyone in Prime Academy's Genocchi cohort for teaching me everything at Prime Digital Academy!  I wouldn't be here today without them.  
 


### Support:

If you have suggestions, comments, or issues, please contact me at rdmjobs@live.com.  Thanks for reviewing my project!  Stay wonderful. <3
