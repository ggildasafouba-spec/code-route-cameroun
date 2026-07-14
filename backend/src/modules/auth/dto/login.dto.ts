import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "+237691234567",
    description: "Numéro de téléphone ou adresse email",
  })
  @IsString()
  identifier: string;

  @ApiProperty({ example: "motdepasse123" })
  @IsString()
  @MinLength(8)
  password: string;
}
