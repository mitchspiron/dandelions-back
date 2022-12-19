import { Strategy } from 'passport-jwt';
declare type JwtPayload = {
    sub: string;
    email: string;
};
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor();
    validate(payload: JwtPayload): JwtPayload;
}
export {};
