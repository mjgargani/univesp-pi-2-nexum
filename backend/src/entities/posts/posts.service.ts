import { Injectable } from '@nestjs/common';
import mock from './mock/posts.json';

type PostsViewType = typeof mock;
const postsView: PostsViewType = mock;

@Injectable()
export class PostsService {
  findAll() {
    return postsView;
  }
}
