// SELECTEDBDD 1 mongodb , si es postgresql
import ManagerMessageMongoDB from "./MongoDB/models/Message.js";
import ManagerMessagePostgresqlDB from "./Postgresql/models/Message.js";

export const getManagerMessages = () => {
  const modelMessages =
    process.env.SELECTEDBDD === 1
      ? new ManagerMessageMongoDB()
      : new ManagerMessagePostgresqlDB();

  return modelMessages;
};

export const getManagerProducts = () => {
    const modelProducts =
      process.env.SELECTEDBDD === 1
        ? new ManagerProductMongoDB()
        : new ManagerProductPostgresqlDB();
  
    return modelProducts;
  };
  
