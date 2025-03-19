export type InsertUserRequestBody = {
  name: string;
  email: string;
};

export type InsertUserResponse = {
  success: boolean;
  message: string;
  error?: unknown;
};
