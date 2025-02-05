export const configSchema = {
  type: "object",
  properties: {
    appName: { type: "string" },
    description: { type: "string" },
    author: {
      type: "object",
      properties: {
        username: { type: "string" },
        fullName: { type: "string" },
        githubUrl: { type: "string", format: "uri" },
        linkedInUrl: { type: "string", format: "uri" },
        creationDate: { type: "string" }
      },
      required: ["username", "fullName", "githubUrl", "linkedInUrl", "creationDate"]
    },
    bootstrap: {
      type: "object",
      properties: {
        cssUrl: { type: "string", format: "uri" },
        jsUrl: { type: "string", format: "uri" }
      },
      required: ["cssUrl", "jsUrl"]
    },
    securityHeaders: {
      type: "object",
      properties: {
        "Content-Security-Policy": { type: "string" },
        "X-Content-Type-Options": { type: "string" },
        "X-Frame-Options": { type: "string" },
        "X-XSS-Protection": { type: "string" },
        "Referrer-Policy": { type: "string" },
        "Permissions-Policy": { type: "string" }
      },
      required: [
        "Content-Security-Policy",
        "X-Content-Type-Options",
        "X-Frame-Options",
        "X-XSS-Protection",
        "Referrer-Policy",
        "Permissions-Policy"
      ]
    }
  },
  required: ["appName", "description", "author", "bootstrap", "securityHeaders"]
};