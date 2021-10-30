# 20Fall_CIS550_Group32 Final Project

### Intstruction to build on your local machine
- Clone the main branch
- In both server and client directory run `npm install`
- Start server in server directory by  `npm start` (make sure your mongoDB is running before starting server)
- Start client in client directory by  `npm start`
- Now the server is running on port 8081 and the client is running on port 3000. 

### Explore features  
- In root page login using your google account/facebook account or regisered account
    * Facebook test account:     
        user: `open_jfayvjp_user@tfbnw.net  `   
        password: `12345cis  `  
    * Google test account:     
        user: `teststore550@gmail.com  `  
        password: `12345cis`
- If not registered before, register new account
- After successfully login in, it will redirect to dashboard
- In dashboard you could use our app store different functions shown on nav bar
- Log out your account


------
### Useful git command 
Usage: creating a new branch, working on your branch and pushing to remote/making pull request  

    $ git status # make sure you are in clean master, no uncommitted changes
    $ git checkout -b my_new_feature_branch  # create a new branch on which add new feature
    # work on your branch, add commits, test, etc
    # notice not using "git add .", just add specific modified files
    $ git commit -am "my work is ready for review and merge to master"  
    $ git push -u origin my_new_feature_branch # push your branch to github, code review
    # more changes after review, commit, push, github merge
    $ git checkout master  # change back to master branch
    $ git pull # get the latest master, now you are ready to start working on your next PRcheck
