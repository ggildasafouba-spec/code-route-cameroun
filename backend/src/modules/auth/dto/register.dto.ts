import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsPhoneNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "Jean" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Kamga" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "+237691234567" })
  @IsString()
  phone: string;

  @ApiProperty({ example: "jean@email.com", required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: "motdepasse123" })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: ["ELEVE", "AUTO_ECOLE"], default: "ELEVE" })
  @IsEnum(["ELEVE", "AUTO_ECOLE"])
  @IsOptional()
  role?: "ELEVE" | "AUTO_ECOLE";

  @ApiProperty({ example: "Douala", required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ enum: ["A", "B", "C", "D", "E"], default: "B" })
  @IsEnum(["A", "B", "C", "D", "E"])
  @IsOptional()
  permitCategory?: "A" | "B" | "C" | "D" | "E";

  @ApiProperty({ example: "Auto-école Excellence", required: false })
  @IsString()
  @IsOptional()
  autoEcoleName?: string;
}
