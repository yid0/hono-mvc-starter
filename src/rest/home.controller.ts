import { Context } from 'hono';
import { getConnInfo } from 'hono/cloudflare-workers';
import { Configuration } from '../configuration/configuration';
import { RoutesMap } from '../configuration/routes';
import { ServiceFactory } from '../services/factory.service';
import { FeedBackService } from '../services/feedback.service';
import { StarService } from '../services/star.service';
import { Handler } from '../types';
import { feedBackComponent } from '../views/components/feedback';
import { layout } from '../views/components/layout';

export class HomeController implements Handler {
    private feedbackService!: FeedBackService;
    private starService!: StarService;

    constructor(
        private readonly configuration: Configuration,
    ) { }

    private initStarService() {
        if (!this.starService) {
            this.starService = ServiceFactory.createService('star', this.configuration.starsCache) as StarService;
        }
    }

    private initFeedbackService() {
        if (!this.feedbackService) {
            this.feedbackService = ServiceFactory.createService('feedback', this.configuration.starsCache) as FeedBackService;
        }
    }

    async handle(): Promise<any> {
        await this.renderHomePage();
        await this.checkStatus();
        await this.handleFeedbacks();
        await this.handleStars();
    }

    private async handleStars() {
        this.configuration.hono.get(RoutesMap.starCheck, async (c: Context) => {
            this.initStarService();

            const identifier = c.req.header('cf-connecting-ip') ||
                c.req.header('x-forwarded-for') ||
                'unknown';

            const hasStarred = await this.starService.hasStarred(identifier);
            return c.json({ hasStarred });
        });

        this.configuration.hono.post('/star', async (c: Context) => {
            this.initStarService();

            const identifier = c.req.header('cf-connecting-ip') ||
                c.req.header('x-forwarded-for') ||
                'unknown';

            const hasStarred = await this.starService.hasStarred(identifier);

            if (hasStarred) {
                await this.starService.removeStar(identifier);
                return c.json({ starred: false });
            } else {
                await this.starService.addStar(identifier);
                return c.json({ starred: true });
            }
        });
    }

    private async renderHomePage() {
        this.configuration.hono.get(RoutesMap.home, async (c: Context) => {
            this.initStarService();
            this.initFeedbackService();

            const page = Number(c.req.query('page')) || 1;

            const [feedbacksData, starCount] = await Promise.all([
                this.feedbackService.findPaginated(page, 4),
                this.starService.getTotalStars()
            ]);

            const totalPages = Math.ceil(feedbacksData.total / 4);
            const feedbacks = feedbacksData.data;

            return c.html(layout({
                configuration: this.configuration,
                feedbacks,
                totalPages,
                page,
                starCount
            }));
        });
    }

    private async handleFeedbacks() {
        this.configuration.hono.get(RoutesMap.feedbacks, async (c: Context) => {
            this.initFeedbackService();

            const page = Number(c.req.query('page')) || 1;
            const feedbacksData = await this.feedbackService.findPaginated(page, 4);

            const acceptHeader = c.req.header('Accept');
            if (acceptHeader?.includes('application/json')) {
                return c.json(feedbacksData);
            }

            const totalPages = Math.ceil(feedbacksData.total / 4);

            return c.html(feedBackComponent({
                feedbacks: feedbacksData.data,
                totalPages,
                page
            }));
        });
    }

    private async checkStatus() {
        this.configuration.hono.get(RoutesMap.health, (c: Context) => {
            console.log('Health check request received');
            return c.json({
                status: 'UP',
                appName: this.configuration.appName,
                description: this.configuration.appDescription,
                version: this.configuration.appVersion,
                connectionInfo: getConnInfo(c)
            });
        });
    }
}
