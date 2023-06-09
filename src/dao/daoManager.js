// SELECTEDBDD 1 mongodb , 2 si es postgresql y 3 filesystem
import ManagerMessageMongoDB from "./MongoDB/models/Message.js";
import ManagerMessagePostgresqlDB from "./Postgresql/models/Message.js";
import ManagerMessageFileSystemDB from "./FileSystem/models/Message.js";

import ManagerProductMongoDB from "./MongoDB/models/Product.js";
import ManagerProductPostgresqlDB from "./Postgresql/models/Product.js";
import ManagerProductFileSystemDB from "./FileSystem/models/Product.js";

// import ManagerCartMongoDB from "./MongoDB/models/Cart.js";
// import ManagerCartPostgresqlDB from "./Postgresql/models/Cart.js";
// import ManagerCartFileSystemDB from "./FileSystem/models/Cart.js";

//import ManagerUserMongoDB from "./MongoDB/models/User.js";
//import ManagerUserPostgresqlDB from "./Postgresql/models/User.js";
//import ManagerUserFileSystemDB from "./FileSystem/models/User.js";

export const getManagerMessages = () => {
  let modelMessage = "";
  switch (process.env.SELECTEDBDD) {
    case 1:
      modelMessage = new ManagerMessageMongoDB();
      break;
    case 2:
      modelMessage = new ManagerMessagePostgresqlDB();
      break;
    case 3:
      modelMessage = new ManagerMessageFileSystemDB();
      break;
  }
  return modelMessage;
};

export const getManagerProducts = () => {
  let modelProduct = "";
  switch (process.env.SELECTEDBDD) {
    case "1":
      modelProduct = new ManagerProductMongoDB();
      break;
    case "2":
      modelProduct = new ManagerProductPostgresqlDB();
      break;
    case "3":
      modelProduct = new ManagerProductFileSystemDB();
      break;
  }
  return modelProduct;
};

// export const getManagerCarts = () => {
//   let modelCart = "";
//   switch (process.env.SELECTEDBDD) {
//     case "1":
//       modelCart = new ManagerCartMongoDB();
//       break;
//     case "2":
//       modelCart = new ManagerCartPostgresqlDB();
//       break;
//     case "3":
//       modelCart = new ManagerCartFileSystemDB();
//       break;
//   }
//   return modelCart;
// };

// export const getManagerUsers = async () => {
//   switch (process.env.SELECTEDBDD) {
//     case "1":
//       const modelUser =  await import("./MongoDB/models/User.js");
//       return modelUser;

//       break;
//     case "2":
//       modelUser =  await import("./PostgreSql/models/User.js");
//       return modelUser;

//       break;
//     case "3":
//       modelUser =  await import("./FileSystem/models/User.js");
//       return modelUser;

//       break;
//   }
// };
