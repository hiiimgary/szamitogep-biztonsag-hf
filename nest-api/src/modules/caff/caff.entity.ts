import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Caff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column()
    animationSlug: string;

    @ManyToMany(() => Tag, tag => tag.animations)
    @JoinTable()
    tags: Tag[];

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.animations)
    @JoinColumn()
    user: User;

    @OneToMany(() => Comment, comment => comment.animation)
    comments: Comment[];

    @Column()
    createdAt: Date;
}