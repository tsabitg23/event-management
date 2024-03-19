import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsString, IsUUID } from "class-validator";

export abstract class BaseEntityDto {
  @ApiProperty({ example: "bbc16ea5-5a52-46fc-82b2-ed8aee0abc77" })
  @IsUUID()
  id: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  isArchived: boolean;

  @ApiProperty({ example: new Date().toISOString() })
  @IsDateString()
  createDateTime: Date;

  @ApiProperty({ example: "system" })
  @IsString()
  createdBy: string;

  @ApiProperty({ example: new Date().toISOString() })
  @IsDateString()
  lastChangedDateTime: Date;

  @ApiProperty({ example: null })
  @IsString()
  lastChangedBy?: string | null;

  @ApiProperty({ example: null })
  @IsString()
  internalComment?: string | null;
}
