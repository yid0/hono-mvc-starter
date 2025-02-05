import { FeedbackDTO } from "../types";
import { Repository } from "./repository";

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

    async findPaginated(page: number = 1, limit: number = 4): Promise<{data: FeedbackDTO[], total: number}> {
        const start = (page - 1) * limit;
        const paginatedData = fakeFeedbackRepository.slice(start, start + limit);
        return {
            data: paginatedData,
            total: fakeFeedbackRepository.length
        };
    }
}


const fakeFeedbackRepository : FeedbackDTO [] = [
    {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@techstartup.io',
        message: 'Love how the MVC pattern is implemented here. Clean architecture made our team migration from Express so much easier! 🚀'
    },
    {
        id: '2',
        name: 'Alex Thompson',
        email: 'alex.t@clouddev.com',
        message: 'The rate limiting implementation is brilliant - saved us hours of work. Perfect for our Cloudflare Workers deployment.'
    },
    {
        id: '3',
        name: 'Maria Garcia',
        email: 'mgarcia@webscale.net',
        message: 'Finally, a TypeScript-first framework that doesn\'t compromise on developer experience. Great job on type safety!'
    },
    {
        id: '4',
        name: 'James Wilson',
        email: 'jwilson@techlead.dev',
        message: 'Our team loves the built-in CORS support and configuration management. Production-ready out of the box.'
    },
    {
        id: '5',
        name: 'Emma Laurent',
        email: 'emma@devops.fr',
        message: 'The factory pattern for controllers is genius - makes testing and dependency injection a breeze! 👏'
    },
    {
        id: '6',
        name: 'David Kim',
        email: 'david.kim@startup.kr',
        message: 'Perfect balance between simplicity and power. Integrated perfectly with our existing Cloudflare stack.'
    },
    {
        id: '7',
        name: 'Nina Patel',
        email: 'nina.p@scale.io',
        message: 'The middleware system is so elegant. Added custom authentication in minutes! Best lightweight MVC framework.'
    },
    {
        id: '8',
        name: 'Marcus Schmidt',
        email: 'marcus@webtech.de',
        message: 'Started using this for a small project, now implementing it company-wide. Documentation is excellent! 📚'
    },
    {
        id: '9',
        name: 'Sophie Anderson',
        email: 'sophie@cloudarch.com',
        message: 'The error handling and logging system saved us during production debugging. Really well thought out!'
    },
    {
        id: '10',
        name: 'Yuki Tanaka',
        email: 'yuki@devteam.jp',
        message: 'Perfect example of how to structure a modern TypeScript project. Clean, maintainable, and scalable. ⭐'
    }
];