import { Hono } from "hono";
import { FeadbackRepository } from "../repository/feedback.respository";
import { HomeController } from "../rest/home.controller";
import { FeedBackService } from "../services/feedback.service";

export class ControllerFactory {
    static async createController(app: Hono, controllerName: string) {

            switch (controllerName) {
                case 'home':
                    
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