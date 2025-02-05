import { Configuration } from "./configuration/configuration";

export type Data =  {
  [key: string]: any;
}

export interface FeedbackDTO {
  id: string;
  name: string;
  message: string;
  email?: string
}


export interface Handler {
  handle(): Promise<void>; 
}