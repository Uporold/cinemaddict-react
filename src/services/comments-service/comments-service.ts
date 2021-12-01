import { AxiosResponse } from "axios";
import { Service } from "../service";
import { Comment, CommentPure } from "../../types";

export class CommentsService extends Service {
  static async loadMovieComments(movieId: number): Promise<Comment[]> {
    const response: AxiosResponse<Comment[]> = await this.api.get(
      `comments/${movieId}`,
    );
    return response.data;
  }

  static async sendComment(
    movieId: number,
    comment: CommentPure,
  ): Promise<Comment> {
    const response: AxiosResponse<Comment> = await this.api.post(
      `comments/${movieId}`,
      {
        message: comment.message,
        emotion: comment.emotion,
      },
    );
    return response.data;
  }

  static async deleteComment(commentId: number): Promise<void> {
    await this.api.delete(`comments/${commentId}`);
  }
}
