import { Hono } from "hono";
import { FeadbackRepository } from "../repository/feedback.respository";
import { HomeController } from "../rest/home.controller";
import { FeedBackService } from "../services/feedback.service";
import { StarService } from "../services/star.service";
import { Configuration } from "./configuration";

export class ControllerFactory {
    static async createController(app: Hono, controllerName: string) {

            switch (controllerName) {
                case 'home':
                    // S'assurer que la configuration est disponible
                    // if (!app.configuration) {
                    //     throw new Error('Configuration not initialized');
                    // }
                    
                    console.log('Creating home controller with configuration:', app.configuration);
                    
                    const repository = new FeadbackRepository();
                    const feedbackService = new FeedBackService(repository);            
                    
                    const homeController = new HomeController(
                        app, 
                        feedbackService
                    );
                    
                    await homeController.handle();
                    console.log('Home controller initialized successfully');
                default:
                    throw new Error('Controller not found');
            }
    
    }
}