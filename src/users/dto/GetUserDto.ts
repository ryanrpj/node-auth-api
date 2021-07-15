export default interface GetUserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}