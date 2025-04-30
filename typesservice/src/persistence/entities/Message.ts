import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Users } from './Users';

@Entity()
export class MessageEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column({length:500, nullable:false})
    message:string;
    @CreateDateColumn({name:"created_at"})
    createdAt:Date;
    @ManyToOne(()=> Users, user => user.messagessend, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_user_send'})
    usersend:Users;
    @ManyToOne(()=> Users, user => user.messagesrecive)
    @JoinColumn({name:'id_user_recive'})
    userrecive:Users;
}