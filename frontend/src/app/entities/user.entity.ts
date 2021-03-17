export class User {
    id: string;
    email: string;
    password: string

    public constructor(init?: Partial<User>) {
        Object.assign(this, init)
    }
}
