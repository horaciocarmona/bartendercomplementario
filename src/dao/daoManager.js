// SELECTEDBDD 1 mongodb , 2 si es postgresql y 3 filesystem
import ManagerMessageMongoDB from "./MongoDB/models/Message.js";
import ManagerMessagePostgresqlDB from "./Postgresql/models/Message.js";
import ManagerMessageFileSystemDB from "./FileSystem/models/Message.js";

export const getManagerMessages = () => {
   let modelMessage=""
   switch (process.env.SELECTEDBDD) {
     case "1" : modelMessage= new ManagerMessageMongoDB();
             break;  
     case "2" : modelMessage= new ManagerMessagePostgresqlDB();
             break;  
     case "3" : modelMessage= new ManagerMessageFileSystemDB();
             break;  
    }
  // console.log(modelMessage)
  // return modelMessage

  // const modelMessage =
  // process.env.SELECTEDBDD === 1
  //   ? new ManagerMessageMongoDB()
  //   : new ManagerMessagePostgresqlDB();

return modelMessage;

};

export const getManagerProducts = () => {
    const modelProducts =
      process.env.SELECTEDBDD === 1
        ? new ManagerProductMongoDB()
        : new ManagerProductPostgresqlDB();
  
    return modelProducts;
  };
  
