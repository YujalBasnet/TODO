import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token){
        return res.status(401).send({
            message: "Token is required",
        });
    }
    try{
    const decoded = jwt.verify(token, "mysecretkey");

    req.user= decoded;

    req.userRole = decoded.role === "admin"? "admin" :
    decoded.role === "user" ? "user" : null;

    next();
    }catch (error){
        return res.status(401).send({
            message: "Invalid token",
        });
    };
};

export const isAdmin =(req, res, next)=>{
    const role = req.userRole;
    if (role ==="admin"){
        next();
    } else{
        res.status(401).send({
            message: "Unauthorized",
        });
    }
};



export const isUser =(req, res, next)=>{
    const role = req.userRole;
    if (role ==="user"){
        next();
    } else{
        res.status(401).send({
            message: "Unauthorized",
        });
    }
};

