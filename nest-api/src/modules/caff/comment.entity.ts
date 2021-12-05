import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Caff } from './caff.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    isHidden: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    content: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.comments, {eager: true})
    @JoinColumn()
    user: User;

    @Column()
    animationId: number;

    @ManyToOne(() => Caff, caff => caff.comments)
    @JoinColumn()
    animation: Caff;
}