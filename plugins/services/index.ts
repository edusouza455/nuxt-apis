import { $Fetch } from "ofetch";
import { IUserProfile } from "./types";

export default class UserService {
    private fetch: $Fetch

    constructor(fetch: any) {
        this.fetch = fetch;
    }

    async getUserProfile() {
        const result = await this.fetch<IUserProfile>('/user/profile',
        {
            method: 'GET'
        }
        );
        
    }

    async getUserProducts() {
        const result = await this.fetch('/user/products',
        {
            method: 'GET'
        }
        );
        
    }

}