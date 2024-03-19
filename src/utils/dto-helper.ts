import { ApiProperty } from "@nestjs/swagger";

export class ResponseSingle<T> {
  @ApiProperty()
  data: T;
}

// export class ResponseMultiple<T> {
//   @ApiProperty({ type: [T] })
//   @IsArray()
//   @Type(() => T)
//   data: T[];

//   @ApiProperty()
//   @IsInt()
//   @Min(0)
//   totalCount: number;
// }
