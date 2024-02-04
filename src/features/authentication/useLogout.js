import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Successfully logged out");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Error logging out");
    },
  });

  return { logout, isLoggingOut };
}
