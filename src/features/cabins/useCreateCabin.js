import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("Cabin added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createMutate, isCreating };
}
