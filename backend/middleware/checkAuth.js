import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token){
        return res.status(400).send({
            message: "Token is required",
        });
    }
    const decoded = jwt.verify(token, "mysecretkey");

    req.userRole = decoded.role === "admin"? "admin" :
    decoded.role === "user" ? "user" :
    decoded.role === "superadmin" ? "superadmin" : null;

    next();
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
}