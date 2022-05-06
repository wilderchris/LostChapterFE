import { Products } from "./Products";
import { User } from "./User";


export class Review {
        reviewId!: number;
        book!: number;
        user!: number;
        reviewTitle!: string;
        reviewText!: string;
        ratingOne!: number;
        ratingTwo!: number;
        ratingThree!: number;
        sentAt!: string;
    }

