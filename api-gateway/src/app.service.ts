import {
    Injectable
} from "@nestjs/common";

@Injectable()
export class AppService {
    healthCheck(): string {
        return `
            It works!. (API Gateway)
            nibgatdevteam
        `;
    }
}
