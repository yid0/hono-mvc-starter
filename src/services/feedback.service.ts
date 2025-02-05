import { Repository } from "../repository/feedback.respository";

export class FeedBackService {
    constructor(private readonly repository: Repository) {
    }
    async getFeedback(id: string): Promise<any> {
        return await this.repository.findById(id);
    }
    async getFeedbacks(): Promise<any> {
        return await this.repository.find();
    }
}