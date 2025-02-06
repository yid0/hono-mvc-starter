import { Configuration } from "./configuration/configuration";

export type Data =  {
  [key: string]: any;
}

export interface RateLimitConfig {
  windowMs: number;      
  maxRequests: number;   
}

export interface RateLimitInfo {
  count: number;
  resetTime: number;
}

export interface FeedbackDTO {
  id: string;
  name: string;
  message: string;
  email?: string
}

export interface Handler {
  handle(): Promise<any>; 
}