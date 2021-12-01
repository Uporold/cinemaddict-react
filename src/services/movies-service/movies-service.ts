import { AxiosResponse } from "axios";
import { Service } from "../service";
import { movieAdapter } from "../../store/adapter/adapter";
import { Movie, UserDetails, UserDetailsToUpdate } from "../../types";

export class MoviesService extends Service {
  static async loadMovies(): Promise<Movie[]> {
    const response: AxiosResponse<Movie[]> = await this.api.get("/movies");
    return response.data.map((movie) => movieAdapter(movie));
  }

  static async loadMovie(id: number): Promise<Movie> {
    const response: AxiosResponse<Movie> = await this.api.get(`/movies/${id}`);
    return movieAdapter(response.data);
  }

  static async updateUserDetails(
    movieId: number,
    userDetails: UserDetailsToUpdate,
  ): Promise<UserDetails> {
    const response: AxiosResponse<UserDetails> = await this.api.patch(
      `/movies/${movieId}/status`,
      userDetails,
    );
    return response.data;
  }
}
