Run the app on local:
- npm install
- npm run server

End pointd exposed on prod:
- https://instantcoderbackend-dabdczf0fwhgasbe.southeastasia-01.azurewebsites.net/api/coder/list
- https://instantcoderbackend-dabdczf0fwhgasbe.southeastasia-01.azurewebsites.net/

Potential issues:
1. One of the mogodb enviornment vairables was explictly through azure, so I am assuming .env file is not getting read correctly which might lead to some other variables not being read correctly and breaking the functionalit, do consider this when som issue comes.
