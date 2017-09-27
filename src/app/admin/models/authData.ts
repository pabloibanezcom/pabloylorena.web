export class AuthData {
    token: string;
    userId: string;
    expirationDate: Date;
    constructor(token: string, userId: string, expirationDate: Date) {
        this.token = token;
        this.userId = userId;
        this.expirationDate = expirationDate;
    }
}
