export type ResendResponse = {
  data: Data | null;
  error: Error | null;
};

export type Data = {
  id: string;
};

export type Error = {
  statusCode: number;
  message: string;
  name: string;
};
