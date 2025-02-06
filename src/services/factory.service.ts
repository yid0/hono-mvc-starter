import { KVNamespace } from "hono";
import { FeedbackRepository } from "../repository/feedback.respository";
import { KVRepository } from "../repository/kv.repository";
import { FeedBackService } from "./feedback.service";
import { StarService } from "./star.service";

type ServiceType = 'feedback' | 'star';

export class ServiceFactory {

    static createService(type: ServiceType, kv: KVNamespace) {     
        
        switch(type) {
            case 'feedback':
                const feedbackRepository = new FeedbackRepository(kv);
                return new FeedBackService(feedbackRepository);
            case 'star':            
                // const kvRepository = new KVRepository(kv);
                return new StarService(KVRepository.getInstance(kv))
            default:
                throw new Error('Invalid service type');
        }

    }
}