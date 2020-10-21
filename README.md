Project 2 Milestone 2 Documentation:
1.	Git clone Milestone 1 and push it into NJIT-CS490 organization naming project2-m2-username
2.	Use your personal Google account and go to  https://console.developers.google.com/ and follow the following steps:
  •	Click CREATE PROJECT and name the project that you have created. 
  •	Click Credentials and then click OAuth client ID
  •	Go back to Credentials then Create Credentials followed by OAuth client ID. At last, click the web application. 
3.	From lect12, use the GoogleButton.jsx as a reference for the Google authentication.
4.	Inside the GoogleButton, add your clientId.
5.	In the same file, add response.profileObj.{name/email/imageUrl} to get the information based on Google authentication. 
6.	Inside the main file change the render to Content_auth and in the GoogleButton file add the render to the content file. What it does is whenever you are authenticated it redirect to your chat room. 
7.	Use the findall method to catch for URL link and Images to rendered inline. 
8.	Most importantly, branch all your changes to the NJIT-CS490/project2-m2-username repo.   
9.	At last run the program to see the outcome and if you are satisfied then deploy your app to Heroku.  

Technical issues:
1.	After signing with the google, I wasn’t getting the chat room information that I have done in Milestone 1. After putting so much time, I was still not able to do it until one classmate told me the concept of redirecting. Using the online resource, I was able to redirect the chat room information after the authentication is complete. 
2.	I was having an issue where we had to pass the name of the user who has signed into the chat. I tried passing the name using socket.emit inside the response but still, when I run the program I wasn’t seeing the name of the authenticated user. After seeing the demo, I realize that I wasn’t calling/listening to the name of the user inside the python-content file.     

Issue that are still exist:
1.	I was successful to complete the requirement but there is an issue with my implementation that still exists. I have used three mappings in this case: one for chat input, one for a clickable link, and another for images. The problem is that all of this information does come one after another in chronological order based on the chat instead the chat is separated into three parts due to three mapping. I have put so much effort into making one single mapping for this, but I wasn’t able to do so. If I had more time, I would definitely take help from TA/Professor/Classmate in advance to overcome this issue.  
