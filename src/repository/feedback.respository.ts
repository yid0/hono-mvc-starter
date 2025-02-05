import { FeedbackDTO } from "../types";
import { Repository } from "./repository";

const fakeFeedbackRepository : FeedbackDTO [] = [
    {
        id: '1',
        name: 'Yani IDOUGHI',
        email: '',
        message: 'Hello, I have a feedback number 1 for you on github'
    },
    {   id: '2',     
        name: 'IDOUGHI YANI', 
        email: '', 
        message: 'Hello, I have a feedback Number 2 for you on Linkedin ' 
    }
];

export class FeadbackRepository implements Repository {

    async save() : Promise<any>  {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: string): Promise<FeedbackDTO | undefined> {
        return fakeFeedbackRepository.find((feedback) => feedback.id === id)
    }

    async find(): Promise<FeedbackDTO[]> {
        return fakeFeedbackRepository;
    }
}