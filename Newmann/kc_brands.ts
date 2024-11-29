import { userVariables } from "testcafe";
import Brand from "./EBrand"
let brandKC;

const getbrandKC = () => {
    return brandKC;
}

const getBrandKCData = (brand:Brand=Brand.ANY) => {
    switch(brand) {
        case Brand.WC: {
            return {
                "root":userVariables.wcTokenHost,
                "realm":userVariables.wcKCRealms,
                "client_id": userVariables.wcClientID,
                "redirect_uri":userVariables.wildCasinoURL
              }
        }
        case Brand.SB: {
            return {                              
                //"client_id": userVariables.sbClientID,
                //"redirect_uri":userVariables.sportsBettingURL
              }
        }
        default: {
            console.error("Brand not supported!");
            return undefined;
        }
    }
}

const getBrandByCustomer = (customer:string) => {
    if(customer.substring(0,1).toLocaleLowerCase() === "w") return Brand.WC;
    if(customer.substring(0,2).toLocaleLowerCase() === "sb") return Brand.SB;
    return undefined;
}

export {
    getbrandKC, getBrandKCData, getBrandByCustomer
}