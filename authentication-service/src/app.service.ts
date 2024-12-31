import "dotenv/config";
import {
    Injectable
} from "@nestjs/common";

@Injectable()
export class AppService {
    healthCheck(): string {
        return `
            It works!. (Authentication)
            nibgatdevteam
        `;
    }
}
