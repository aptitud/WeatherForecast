WeatherForecast
===============

Tweeting sea weather forecasts

The following works on Mac (may also work on Windows, haven't tried it) to run the app locally
1. Install node and npm
2. Clone this repo
3. Run "npm install" (command line in source root) to install app dependencies
4. Run "node app.js" to start app
5. Browse to http://127.0.0.1:8080/Sjovaderprognos or e.g. http://127.0.0.1:8080/Sjovaderprognos/NorraOstersjon

To deploy to Heroku
1. Install Heroku toolbelt
2. Add Heroku git repo as origin (heroku git:remote -a seaweatherforecast)
3. Push to Heroku to deploy (git push heroku master)