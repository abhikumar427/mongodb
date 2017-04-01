# Mongodb

To use this application you need to install some packages :
- express
- ejs
- body-parser
- request
- path
- child_process
- fs
- mongodb

You can use this line to add all packages you need :+1: : 
> _npm install express ejs body-parser request path child_process fs mongodb_ 

To use this application you should install mongodb server. You can download it from http://www.mongodb.org/downloads and you should install node js also https://nodejs.org/en/download/. Think to define it in environment variable for easiest manipulation!

## Steps to use it

#### First step
Enter your repo where you downloaded the mongodb server, more precisely the "bin" folder
![alt tag](https://github.com/absabry/mongodb/blob/master/images/connexion.JPG)

And then you can see that the mongodb is currently running! 
![alt tag](https://github.com/absabry/mongodb/blob/master/images/connection%20began.JPG)

You don't have to worry about the dataset, the application will check if it exists and if not, it will dowloaded it once again and insert it into your mongodb server (if you want to for sure!)

#### Second step

You have a query form, where you can search for articles you want with your criteria. 
![alt tag](https://github.com/absabry/mongodb/blob/master/images/queryform.JPG)

#### Third Step
You have a another options to query the database, you can search for articles you want with some pre-defined queries we made for you! 
![alt tag](https://github.com/absabry/mongodb/blob/master/images/auto.JPG)
And you have several options, you just have to choose one of them. 
![alt tag](https://github.com/absabry/mongodb/blob/master/images/options.png)


## Results 
When you query the database using the query form or the pre-defined queries, you would see the results in another page, like you would see it in RoboMongo (in JSON form)
Here's an example of utilisation : 
Your query form
![alt tag](https://github.com/absabry/mongodb/blob/master/images/pres-result.JPG)
The result you have for this query : 
![alt tag](https://github.com/absabry/mongodb/blob/master/images/results.JPG)
And finally if there are no results, you will have something like : 
![alt tag](https://github.com/absabry/mongodb/blob/master/images/noresult.JPG)
