import { makeAutoObservable, runInAction } from "mobx";
import { Comment, CommentPure } from "../types";
import { RootStore } from "./root-store";
import { CommentsService } from "../services/comments-service/comments-service";

export class CommentStore {
  rootStore: RootStore;
  comments: Comment[] = [];
  isFormBlocked = false;
  isFormError = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  resetComments(): void {
    this.comments = [];
  }

  private setFormError(isFormError: boolean) {
    this.isFormError = isFormError;
  }

  async loadMovieComments(movieId: number): Promise<void> {
    const result = await CommentsService.loadMovieComments(movieId);
    runInAction(() => {
      this.comments = result;
    });
  }

  async sendComment(movieId: number, comment: CommentPure): Promise<boolean> {
    this.isFormBlocked = true;
    try {
      await CommentsService.sendComment(movieId, comment);
      await this.loadMovieComments(movieId);
      return true;
    } catch (err) {
      this.setFormError(true);
      setTimeout(() => {
        this.setFormError(false);
      }, 600);
    } finally {
      runInAction(() => {
        this.isFormBlocked = false;
      });
    }
    return false;
  }

  async deleteComment(commentId: number, movieId: number): Promise<void> {
    await CommentsService.deleteComment(commentId);
    await this.loadMovieComments(movieId);
  }
}
