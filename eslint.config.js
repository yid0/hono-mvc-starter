import pluginJs from "@eslint/js";

export default [
    pluginJs.configs.recommended,

   {
       rules: {
           "no-unused-vars": "error",
           "no-undef": "warn"
       }
   }
];