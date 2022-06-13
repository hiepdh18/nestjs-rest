import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  password: string;
}
