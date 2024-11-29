var newman=require('newman');

function runNewman() {
  return new Promise((resolve, reject) => {
    newman.run({
      collection: require('./newman_run/01collection.json'),
      environment: require('./newman_run/01environment.json'),
      reporters: 'cli',
      insecure: true,
    }, function (err) {
      if (err) { throw err; }
      console.log('collection run complete!');
    }).on("beforeRequest", (error, data) => {
      if (error) {
        reject(console.error(error));
        return;
      }
    }).on("request", (error, data) => {
      const fs = require('fs');
      if (error) {
        reject(console.error(error));
        return;
      }
      if (data.item.name === "Token") {
        const datLoad = JSON.stringify(data.response.headers.members)
        const parseJSon = JSON.parse(datLoad)
        console.log(datLoad);
        //console.log(datLoad);
        //console.log(datLoad);
        /*for (let index = 0; index < parseJSon.length; index++) {
          const element = parseJSon[index].key;
          if (element === 'Set-Cookie') {
            const cookieValue = parseJSon[index].value;
            const resulString = cookieValue.split(';')
            for (let index = 0; index < resulString.length; index++) {
              const keyCloackCookie = resulString[index].split('=');
              switch (keyCloackCookie[index]) {
                case 'KEYCLOAK_IDENTITY':
                  console.log('KEYCLOAK_IDENTITY ', keyCloackCookie[1], '\n');
                  const keycloackInden = keyCloackCookie[1];
                  //return (keycloackInden);
                  break;
                case 'KEYCLOAK_IDENTITY_LEGACY':
                  console.log('KEYCLOAK_IDENTITY_LEGACY ', keyCloackCookie[1], '\n');
                  const keycloackIndenLega = keyCloackCookie[1];
                  //return (keycloackIndenLega);
                  break;
                case 'KEYCLOAK_SESSION':
                  console.log('KEYCLOAK_SESSION ', keyCloackCookie[1], '\n');
                  const keycloackSession = keyCloackCookie[1];
                 // return (keycloackSession)
                  break;
                case 'KEYCLOAK_SESSION_LEGACY':
                  console.log('KEYCLOAK_SESSION_LEGACY ', keyCloackCookie[1], '\n');
                  const keycloackSessionLeg = keyCloackCookie[1];
                  //return (keycloackSessionLeg)
                  break;
                case 'server_persistent':
                  console.log('SERVER_PERSISTENT ', keyCloackCookie[1], '\n');
                  const keycloackServer = keyCloackCookie[1];
                  //return (keycloackServer)
                  break;
                default:
                  break;
              }
            }
          }
        }*/
      }
    }).on("iteration", (error, data) => {
      if (error) {
        reject(console.error(error));
        return;
      }
      console.log(data);
    }).on("done", (error, data) => {
      if (error) {
        reject(console.error(error));
        return;
      }
    });
  })
}