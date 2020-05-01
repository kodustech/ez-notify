# EZ.Notify

Ez.Notify is a message scheduling system for Slack.
You can schedule recurring or one-time messages to one or more people at once.

## Running locally step by step

After cloning the project:

Set up a [firebase](https://firebase.google.com/) database.

- ### Create a project  
Get json of configuration  

- ### Authentication  
Enable auth E-mail/Password

- ### Create a firestore databse and set rule  
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
- ### Create index  
**collection**: notification  
**fields**: organizationId, date, hour  

**collection**: user  
**fields**: organizationId, email

- ### update .env
```
FIREBASE_CONFIG={"apiKey":"xxx","authDomain":"xxx","databaseURL":"xxx"},...
```

## Running

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

## Cron function
function that will be triggered hourly to send scheduled messages:
[Cron function](https://github.com/ezDevs/ez-notify-cron)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## [Ezdevs](https://ezdevs.com.br/)
Ezdevs is a software development company.
We offer end-to-end solutions to companies that believe that technology is a key factor in the success of big businesses.

## License
[MIT](https://choosealicense.com/licenses/mit/)
