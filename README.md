# CS301Project

Set up:
  You need to have Node.js downloaded (https://nodejs.org/en/download/) to run app.js. Once you have Node.js downloaded, go to the directory containing app.js and type: node app.js. This will run the server script. Once you do this, any html file containing the appropriate script will be able to connect to the node server. App.js actually just acts as a bridge between the client browser and the mySQL database. I used XAMPP (https://www.apachefriends.org/download.html) to run the mySQL server. You may need to manipulate app.js to run with XAMPP on your machine, but for the most part, everything should be there.

  To create example database you will need to create the intial database manually through phpMyAdmin. Just hit new on the left and name it CS301_Project_Database. Then all you need to do is copy and paste the entire contents of the DBCreationSQL into the SQL tab on phpMyAdmin and run it. This should create all tables and populate them.
