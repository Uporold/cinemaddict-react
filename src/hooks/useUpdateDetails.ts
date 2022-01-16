import { Movie, UserDetailsToUpdate } from "../types";
import { useStore } from "../store";

export const useUpdateUserDetailsHandler = (movie: Movie) => {
  const {
    movieStore: { updateUserDetails },
  } = useStore();
  return (variable: keyof UserDetailsToUpdate) => () => {
    updateUserDetails(movie.id, {
      ...movie.userDetails,
      [variable]: !movie.userDetails[variable],
    });
  };
};
