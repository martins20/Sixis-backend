import { getMongoRepository, MongoRepository } from 'typeorm';
import { v4 } from 'uuid';

import IPostsRespository from '@modules/post/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import Post from '../schemas/Post';

export default class PostsRepository implements IPostsRespository {
    private ormRepository: MongoRepository<Post>;

    constructor() {
        this.ormRepository = getMongoRepository(Post, 'mongo');
    }

    async create({ content, title }: ICreatePostDTO): Promise<Post> {
        const post = this.ormRepository.create({
            content,
            post_id: v4(),
            title,
            banner: '',
        });

        await this.ormRepository.save(post);

        return post;
    }

    async findById(post_id: string): Promise<Post | undefined> {
        const post = await this.ormRepository.findOne({ post_id });

        return post;
    }

    async findAllPosts(): Promise<Post[]> {
        const posts = await this.ormRepository.find();

        return posts;
    }

    async save(post: Post): Promise<Post> {
        const updatedPost = await this.ormRepository.save(post);

        return updatedPost;
    }

    async deletePost(post_id: string): Promise<void> {
        await this.ormRepository.deleteOne({ post_id });
    }
}
