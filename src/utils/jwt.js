import jwt from "jsonwebtoken";
// primer argumento ojeto de asociacion del tocket
// segundo clave privada del ciftrado
// tercero tiempo de expiracion
export const generateToken = (user) => {
    //seria el register
    const token = jwt.sign({
        user
    }, process.env.PRIVATE_KEY_JWT, {
        expiresIn: "12h",
    });
    return token;
};

export const authToken = (req, res, next) => {
    //seria el login
    //consulto el heder
    const authHeader = req.headears.authorization;
    if (!authHeader) {
        //entra si no inicio sesion o vencio el token
        return res.status(401).send({
            error: "Usuario no autenticado"
        });
    }
    const token = authHeader.split(" ")[1]; //sacar palabra no necesaria dentro en posicion 1 del authHeader
    // token existente
    jwt.sign(token, process.env.PRIVATE_KEY_JWT, (error, credentials) => {
        // verificar si el token es valido
        if (error) {
            return res.status(403).send({
                error: "Usuario no autorizado"
            });
        }
        //token decifrado correctamente
        req.user = credentials.user;
        next();
    });
};