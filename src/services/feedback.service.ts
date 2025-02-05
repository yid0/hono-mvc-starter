import { FeedbackDTO } from "../types";
import { Repository } from "../repository/repository";

export class FeedBackService {
    constructor(private readonly repository: Repository) {}

    async getFeedback(id: string): Promise<FeedbackDTO | undefined> {
        return await this.repository.findById(id);
    }

    async getFeedbacks(): Promise<FeedbackDTO[]> {
        return await this.repository.find();
    }

    async findPaginated(page: number, limit: number): Promise<{data: FeedbackDTO[], total: number}> {
        return await this.repository.findPaginated!(page, limit);
    }
}