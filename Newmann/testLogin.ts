import { userVariables } from "testcafe";
import { getKcToken } from "./authentication";

fixture ("testAPi");

test ("test api nsb",async (t)=>{
 await getKcToken('SB1456395','Aa123456');
  
})