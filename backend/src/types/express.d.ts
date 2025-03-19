declare namespace Express {
  export interface Request {
    cookies: { [key: string]: string };
  }
}
