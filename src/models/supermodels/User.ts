export class User {
    mailUser : string;
    password : string;
    pseudo : string;
    promotion : string;
    credit: number;
    constructor(mailUser, pseudo, promotion, credit, password){
        this.mailUser = mailUser;
        this.pseudo = pseudo;
        this.promotion = promotion;
        this.credit = credit;
        this.password = password;
    }
}