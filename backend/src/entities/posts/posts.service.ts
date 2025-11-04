import { Injectable } from '@nestjs/common';
import mock from './mock/posts.json';

@Injectable()
export class PostsService {
  findAll() {
    return mock;
  }
}
