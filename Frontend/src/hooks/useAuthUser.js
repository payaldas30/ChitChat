import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // Don't retry on failure
  });

  // If not authenticated, return null user
  const isUnauthorized = error?.response?.status === 401;

  return {
    isLoading,
    authUser: isUnauthorized ? null : data?.user,
    error,
  };
};

export default useAuthUser;
