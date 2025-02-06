import { Hono } from "hono";
import { Configuration } from "../configuration/configuration";
import { HomeController } from "./home.controller";

export class ControllerFactory {
    static async createController(app: Hono, configuration : Configuration,  controllerName: string) {

            switch (controllerName) {
                case 'home': {                    
                    const homeController = new HomeController(configuration);
                    await homeController.handle();
                    console.log('Home controller initialized successfully');
                    break;
                }
                default:
                    throw new Error(`Controller ${controllerName} not found`);
            }
    }
}