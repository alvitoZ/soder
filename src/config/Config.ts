require("dotenv").config();

export const Config = {
  mongourl: process.env.DATABASE || "undefined",
};
