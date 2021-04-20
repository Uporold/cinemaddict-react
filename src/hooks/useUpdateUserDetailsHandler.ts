import { useUpdateUserDetails } from "../redux/data/hooks/useUpdateUserDetails";
import { Movie, UserDetailsToUpdate } from "../types";
import { toRawMovie } from "../redux/adapter/adapter";
import { Key } from "../const";

export const useUpdateUserDetailsHandler = (movie: Movie) => {
  const updateUserDetails = useUpdateUserDetails();

  return (target: keyof UserDetailsToUpdate) => () => {
    const newMovie = movie;
    newMovie.userDetails[target] = !movie.userDetails[target];
    if (target === Key.HISTORY) {
      newMovie.userDetails.watchingDate = newMovie.userDetails[target]
        ? new Date()
        : null;
    }
    updateUserDetails(toRawMovie(newMovie));
  };
};
