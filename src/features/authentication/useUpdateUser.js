import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success("Successfully updated user");
      queryClient.setQueryData(["user"], user);
    },
    onError: () => {
      toast.error("Error updating user");
    },
  });
  return { updateUser, isUpdatingUser };
}
