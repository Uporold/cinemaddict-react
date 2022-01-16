import { AppStore } from "./app-store";
import { AuthStore } from "./auth-store";
import { CommentStore } from "./comment-store";
import { MovieStore } from "./movie-store";

export class RootStore {
  appStore: AppStore;
  authStore: AuthStore;
  commentStore: CommentStore;
  movieStore: MovieStore;

  constructor() {
    this.appStore = new AppStore(this);
    this.authStore = new AuthStore(this);
    this.commentStore = new CommentStore(this);
    this.movieStore = new MovieStore(this);
  }
}
