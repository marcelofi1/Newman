const newman = require("newman")
import Brand from "./EBrand";
import { getBrandByCustomer, getBrandKCData } from "./kc_brands";
const fs = require('fs')

let environments = require('./newman_run/01environment.json');
let token;

export async function getKcToken(username: string, password: string) {
  //const brand = getBrandByCustomer(username);
  //const collectionEnv = getEnvironment(brand, username, password);   
  return await runNewman();
}

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
      resolve(token);

    });
  })
}

function getEnvironment(brand: Brand = Brand.SB, username: string, password: string) {
  const kc_brandInfo = getBrandKCData(brand);
  //environments.values[0].value = kc_brandInfo?.root;
  //environments.values[1].value = username;
  //environments.values[2].value = password;
  /*environments.values[7].value = kc_brandInfo?.client_id;
  environments.values[9].value = kc_brandInfo?.redirect_uri;
  const redirect_uri = kc_brandInfo?.redirect_uri;
  //@ts-ignore
  const newRedUri = redirect_uri.replace(":", "%3A").replaceAll("/", "%2F");  
  environments.values[9].value = newRedUri;  */
  return environments;
}