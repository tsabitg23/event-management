import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    cityId: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}