import { ApiProperty } from '@nestjs/swagger';

export class FilterProductDto {
  @ApiProperty()
  search: string;
  @ApiProperty()
  category: string;
}
