export declare class MailService {
    transporter: any;
    sendMailConfirmation(to: any, token: any): Promise<any>;
    sendMailForgotPassword(to: any, token: any): Promise<any>;
    sendMailEventRegistration(to: any, nom: any, prenom: any, event: any, slug: any): Promise<any>;
    sendMailAcceptWriterRequest(to: any, nom: any, prenom: any): Promise<any>;
    sendMailDeclineWriterRequest(to: any, nom: any, prenom: any): Promise<any>;
}
