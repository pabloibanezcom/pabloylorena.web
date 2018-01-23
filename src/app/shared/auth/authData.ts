export class AuthData {
    token: string;
    email: string;
    expirationDate: Date;
    constructor(token: string, email: string, expirationDate?: Date) {
        this.token = token;
        this.email = email;
        this.expirationDate = expirationDate;
    }
}
