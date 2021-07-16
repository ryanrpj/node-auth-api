import argon2 from 'argon2';

import { CRUD } from '../../common/interfaces';
import { UserModel, CreateUserDto, GetUserDto, PatchUserDto, PutUserDto } from '..';


export default class UsersDao implements CRUD {
    private static instance: UsersDao;

    private constructor() {}

    public static getInstance(): UsersDao {
        if (!UsersDao.instance) UsersDao.instance = new UsersDao();

        return UsersDao.instance;
    }

    public async create(resource: CreateUserDto): Promise<string> {
        const hashedPassword = await argon2.hash(resource.password, {timeCost: 20, saltLength: 15});
        resource.password = hashedPassword;
        
        const newUser = await UserModel.create(resource);

        return newUser._id;
    }

    public async getById(id: string): Promise<GetUserDto | undefined> {
        const user = await UserModel.findById(id);
        return this.parseUser(user);
    }

    public async getByEmail(email: string): Promise<GetUserDto | undefined> {
        const user = await this._getByEmail(email);

        return this.parseUser(user);
    }

    public async getPasswordByEmail(email: string): Promise<GetUserDto> {
        const user = await this._getByEmail(email, {password: 1});

        return user;
    }

    public async list(limit: number = 25, page: number = 0): Promise<GetUserDto[]> {
        limit = Math.max(25, limit);
        const users = await UserModel.find({}).limit(limit).skip(limit * page).exec();
        const parsedUsers: GetUserDto[] = users.map(this.parseUser);

        return parsedUsers;
    }

    public async patchById(id: string, resource: PatchUserDto): Promise<GetUserDto | undefined> {
        const patchedUser = await UserModel.findOneAndUpdate({ _id: id }, resource, { new: true, omitUndefined: true }).exec();

        return this.parseUser(patchedUser);
    }

    public async putById(id: string, resource: PutUserDto): Promise<GetUserDto | undefined> {
        const replacedUser = await UserModel.findOneAndUpdate({ _id: id }, resource, { new: true }).exec();

        return this.parseUser(replacedUser);
    }

    public async deleteById(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id).exec();
    }

    private parseUser(user: any): GetUserDto | undefined {
        if (!user) return undefined;

        const {_id, firstName, lastName, email} = user._doc || user;
        return {id: _id, firstName, lastName, email};
    }

    private async _getByEmail(email: string, projection?: object): Promise<any> {
        const user = await UserModel.findOne({email}, projection);

        return user;
    }
}