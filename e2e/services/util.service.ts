export class UtilService {

    base_path: string;
    paths: any;

    constructor() {
        this.base_path = 'http://localhost:4200/';
        this.paths = {
            login: 'admin/login',
            invitations: 'admin/invitations'
        };
     }

    getPath(page: string) {
        return this.base_path + this.paths[page];
    }

    getAdminCredentials() {
        return {
            user: 'test.admin@gmail.com',
            password: '1234'
        };
    }

}
