import { Movie, UserDetailsToUpdate } from "../types";
import { useUpdateUserDetails } from "../store/movie/hooks/useUpdateUserDetails";

export const useUpdateUserDetailsHandler = (movie: Movie) => {
  const updateUserDetails = useUpdateUserDetails();
  return (variable: keyof UserDetailsToUpdate) => () => {
    updateUserDetails(movie.id, {
      ...movie.userDetails,
      [variable]: !movie.userDetails[variable],
    });
  };
};
