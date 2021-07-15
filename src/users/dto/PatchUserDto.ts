import CreateUserDto from './CreateUserDto.js';

export default interface PatchUserDto extends Partial<CreateUserDto> { }