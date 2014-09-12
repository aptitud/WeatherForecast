WeatherForecast
===============

Tweeting sea weather forecasts

The following works on Mac (may also work on Windows, haven't tried it) to run the app locally
- Install node and npm
- Clone this repo
- Run "npm install" (command line in source root) to install app dependencies
- Run "node app.js" to start app
- Browse to http://127.0.0.1:8080/Sjovaderprognos or e.g. http://127.0.0.1:8080/Sjovaderprognos/NorraOstersjon

To deploy to Heroku
- Install Heroku toolbelt
- Add Heroku git repo as origin (heroku git:remote -a seaweatherforecast)
- Push to Heroku to deploy (git push heroku master)
