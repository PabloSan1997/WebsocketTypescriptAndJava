import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { MessageEntity } from './Message';

@Entity()
export class Users{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column({length:60, unique:true, nullable:false})
    username:string;
    @Column({length:60, nullable:false})
    nickname:string;
    @Column({length:600, nullable:false})
    urlImage:string;
    @Column({length:600, nullable:false})
    password:string;
    @Column({length:10, nullable:false})
    role:string;
    @OneToMany(()=>MessageEntity, message => message.usersend)
    messagessend:MessageEntity[];
    @OneToMany(()=>MessageEntity, message => message.userrecive)
    messagesrecive:MessageEntity[];
}