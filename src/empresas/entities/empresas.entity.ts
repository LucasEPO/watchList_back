import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  pass_hash: string;
}
