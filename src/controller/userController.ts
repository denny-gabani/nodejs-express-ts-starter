import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { UserRequest } from "../dto/user";
import User from "../models/user";

export const authenticateToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ message: "Unauthorized" }); // if there isn't any token

  try {
    const jwtRepsponse = jwt.verify(token, process.env.TOKEN_SECRET ?? "");

    req.user = await User.findById((jwtRepsponse as any).id);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  next();
};
