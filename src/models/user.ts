import { Request, Response } from "express";
import pool from "../config/db.config";
import { UserDto } from "../dto/user";

class SessionUser implements UserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  constructor(user: UserDto) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
  }
}

class User {
  static findById(id: number) {
    return new Promise<UserDto>((resolve, reject) => {
      try {
        pool.query(
          "Select * from tbl_users where id = ? ",
          id,
          function (err, res) {
            if (err) {
              reject(err);
            } else {
              resolve(new SessionUser(JSON.parse(JSON.stringify(res[0]))));
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default User;
