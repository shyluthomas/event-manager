import jwt from "jsonwebtoken";
import { compareAsc } from "date-fns";
import * as fs from "fs";
import * as path from "path";
import {
  LoginResponseDto,
  decodedTokenDetailsDto,
  decodedTokenDto,
  tokenDecodeRepsonseDetailsDto,
  tokenDecodeRepsonseDto,
  userJwtDto,
} from "../types";
import config from "./config";
import { response } from "express";

const helpers = {
  generateJwtToken: (userData: userJwtDto): LoginResponseDto => {
    const user = {
      id: userData.userId,
      username: userData.username,
    };
    const secretKey = config.SECRET_KEY;
    const token = jwt.sign({ user }, secretKey, { expiresIn: "4h" });
    const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: "1d" });

    return {
      token,
      refreshToken,
      status: 201,
    };
  },

  decodeTokenJWT: (token: string): tokenDecodeRepsonseDetailsDto => {
    let response: tokenDecodeRepsonseDetailsDto = {
      status: 401,
      message: "",
      tokenData: { user: { username: "", id: 0 }, exp: 0, iat: 0 },
    };
    try {
      const decodedToken = jwt.decode(token) as decodedTokenDetailsDto;
      if (!decodedToken) {
        response = {
          status: 401,
          message: "Invalid Token..",
          tokenData: { user: { username: "", id: 0 }, exp: 0, iat: 0 },
        };
        return response;
      }
      const expiretimeStamp = new Date(decodedToken.exp * 1000); // in seconds
      const now = new Date();
      if (expiretimeStamp <= now) {
        response = {
          status: 401,
          message: "Token expired..",
          tokenData: { user: { username: "", id: 0 }, exp: 0, iat: 0 },
        };
        return response;
      }
      response = {
        status: 200,
        message: "Valid Token",
        tokenData: decodedToken,
      };
      return response;
    } catch (e) {
      console.log(e);
      return response;
    }
  },
  fileUpload: async (
    fileName: string,
    uploadPath: string,
    file: any
  ): Promise<string> => {
    const fileNameToSave = Date.now() + fileName + ".jpeg";
    fs.writeFileSync(
      path.join(uploadPath, fileNameToSave),
      Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), "base64")
    );
    return fileNameToSave;
  },
};

export default helpers;
