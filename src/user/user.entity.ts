import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email', 'username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    lastname: string;
    
    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
