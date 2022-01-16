import { makeAutoObservable, runInAction } from "mobx";
import { Movie, UserDetailsToUpdate } from "../types";
import { RootStore } from "./root-store";
import { MoviesService } from "../services/movies-service/movies-service";
import { getUserRank } from "../utils/common";
import { getMoviesByFilter } from "../utils/filter";
import { getMoviesBySort } from "../utils/sorting";

const CUT_LENGTH = 5;

export class MovieStore {
  rootStore: RootStore;
  movies = [] as Movie[];
  currentMovie = {} as Movie;
  showedMoviesCount = CUT_LENGTH;
  isMoviesLoaded = false;
  isMovieLoaded = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  showMoreMovies(): void {
    this.showedMoviesCount += CUT_LENGTH;
  }

  setDefaultMoviesCount(): void {
    this.showedMoviesCount = CUT_LENGTH;
  }

  resetCurrentMovie(): void {
    this.currentMovie = {} as Movie;
    this.isMovieLoaded = false;
  }

  resetMovies(): void {
    this.movies = [];
    this.isMoviesLoaded = false;
  }

  async loadMovies(): Promise<void> {
    const result = await MoviesService.loadMovies();
    runInAction(() => {
      this.movies = result;
      this.isMoviesLoaded = true;
    });
  }

  async loadMovie(movieId: number): Promise<void> {
    const result = await MoviesService.loadMovie(movieId);
    runInAction(() => {
      this.currentMovie = result;
      this.isMovieLoaded = true;
    });
  }

  async updateUserDetails(
    movieId: number,
    userDetails: UserDetailsToUpdate,
  ): Promise<void> {
    const updatedUserDetails = await MoviesService.updateUserDetails(
      movieId,
      userDetails,
    );
    runInAction(() => {
      this.movies = this.movies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              userDetails: updatedUserDetails,
            }
          : movie,
      );
    });
  }

  // Computeds

  get userRank(): string {
    return getUserRank(this.movies);
  }

  get topRatedMovies(): Movie[] {
    return this.movies
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
  }

  get mostCommentedMovies(): Movie[] {
    return this.movies
      .slice()
      .sort((a, b) => b.commentsCount - a.commentsCount)
      .slice(0, 2);
  }

  get showedSortedFilteredMovies(): Movie[] {
    return getMoviesByFilter(
      getMoviesBySort(this.movies, this.rootStore.appStore.currentSortType),
      this.rootStore.appStore.currentFilterType,
    ).slice(0, this.showedMoviesCount);
  }

  get moviesCountByCurrentFilter(): number {
    return getMoviesByFilter(
      this.movies,
      this.rootStore.appStore.currentFilterType,
    ).length;
  }

  getMoviesCountByFilter(filterType: string): number {
    return getMoviesByFilter(this.movies, filterType).length;
  }
}
