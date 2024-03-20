export type Conference = {
  id: string;
  short: string;
  providerId: string;
  status: "OPEN" | "FINISHED";
};

export type CreateConferenceResponse = {
  conference: Conference;
};
