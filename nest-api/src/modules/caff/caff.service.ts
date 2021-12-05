import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { ERROR_KEYS } from 'src/shared/models/error-keys.enum';
import { IMetadata } from 'src/shared/models/metadata.interface';
import { IAnimation, IAnimationDetailResponse, IComment } from 'src/shared/response-interfaces/animation-detail.response';
import { Repository } from 'typeorm';
import { Caff } from './caff.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
const exec = require('child_process').execFile;

@Injectable()
export class CaffService {

    constructor(
        @InjectRepository(Caff) private caffRepository: Repository<Caff>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    ) {}

    async parseCaffToGif(filename: string, userId: number) {
        const animationMetadataRaw: string = await new Promise((resolve, reject) => {    
            exec('dist/parser.exe', [`dist/public/media/${filename}`, `dist/public/media/${filename.replace('.caff', '.gif')}`], (err, data: string) => {
                console.log(err);
                console.log(data);
                if (err) reject(err);
                else resolve(data);
            });
        });

        const meta: IMetadata = this.parseMetadata(animationMetadataRaw);

        const tags = await this.createTags(meta.tags);

        const newAnimation = this.caffRepository.create({
            author: meta.author,
            description: meta.description,
            createdAt: meta.createdAt,
            animationSlug: filename.replace('.caff', ''),
            tags: tags,
            userId: userId
        });

        await this.caffRepository.save(newAnimation);

        return {
            id: newAnimation.id,
            author: newAnimation.author,
            tags: newAnimation.tags.map(t => t.tag),
            description: newAnimation.description,
            createdAt: newAnimation.createdAt,
            gifPath: this.getImagePath(newAnimation.animationSlug)
        }
    }

    async getAnimationDetail(id: number, isAdmin: boolean): Promise<IAnimationDetailResponse> {
        const animation = await this.caffRepository.findOne(id, {relations: ['tags', 'comments']});
        if (!animation) {
            throw new NotFoundException(ERROR_KEYS.ANIMATION_NOT_FOUND);
        }

        const comments: IComment[] = animation.comments.map(comment => {
            return {
                id: comment.id,
                isHidden: comment.isHidden,
                content: comment.content,
                user: {
                    id: comment.user.id,
                    name: comment.user.name
                }
            };
        }).filter(c => isAdmin ? true : c.isHidden ? false : true);

        const mappedAnimation: IAnimationDetailResponse = {
            animation: {
                id: animation.id,
                author: animation.author,
                tags: animation.tags.map(t => t.tag),
                description: animation.description,
                createdAt: animation.createdAt.toISOString(),
                gifPath: this.getImagePath(animation.animationSlug)
            },
            comments: comments
        };

        return mappedAnimation
    }

    async createComment(userId: number, animationId: number, content: string) {
        const animation = await this.caffRepository.findOne(animationId);

        if (!animation) {
            throw new NotFoundException(ERROR_KEYS.ANIMATION_NOT_FOUND);
        }

        const comment = this.commentRepository.create({
            content: content,
            userId: userId,
            animation: animation
        });

        await this.commentRepository.save(comment);

        return {
            id: comment.id,
            content: comment.content
        };
    }

    async hideComment(id: number, userId: number) {
        const comment = await this.commentRepository.findOne(id, {relations: ['user']});

        if (!comment) {
            throw new NotFoundException(ERROR_KEYS.COMMENT_NOT_FOUND);
        }

        if (comment.user.id !== userId) {
            throw new NotFoundException(ERROR_KEYS.NO_PERMISSION);
        }

        comment.isHidden = true;

        return this.commentRepository.save(comment);
    }

    async deleteComment(id: number) {
        const comment = await this.commentRepository.findOne(id);

        if (!comment) {
            throw new NotFoundException(ERROR_KEYS.COMMENT_NOT_FOUND);
        }

        return this.commentRepository.remove(comment);
    }

    async searchAnimations(query: string[]): Promise<IAnimation[]> {
        const animations = await this.caffRepository.find({relations: ['tags']});
        if (!animations) {
            return [];
        }

        const mappedAnimations =  animations.map(animation => {
            return {
                id: animation.id,
                author: animation.author,
                tags: animation.tags.map(t => t.tag),
                description: animation.description,
                createdAt: animation.createdAt.toISOString(),
                gifPath: this.getImagePath(animation.animationSlug)
            }
        });

        if (!query) {
            return mappedAnimations;
        }

        return mappedAnimations.filter(a => query.every(q => a.tags.includes(q)));
    }

    async deleteAnimation(id: number) {
        const animation = await this.caffRepository.findOne(id);

        if (!animation) {
            throw new NotFoundException(ERROR_KEYS.ANIMATION_NOT_FOUND);
        }

        return this.caffRepository.remove(animation);
    }

    private async createTags(tags: string[]): Promise<Tag[]> {
        return Promise.all(tags.map(async (tag) => {
            const existingTag = await this.tagsRepository.findOne(tag);

            if (existingTag) {
                return existingTag;
            } else {
                const newTag = this.tagsRepository.create({tag});
                return await this.tagsRepository.save(newTag);
            }
        }));
    }

    private parseMetadata(meta: string): IMetadata {
        return {
            tags: ['wow', 'nice', 'cool'],
            description: 'mock description',
            author: 'TesztElek',
            createdAt: '2020.7.2 14:50'
        }
    }

    private getImagePath(filename: string): string {
        return `http://localhost:3000/public/media/${filename}.gif`;
    }
}
