import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    // can't pass more than one argument in mutateFn
    mutationFn: ({ newCabinData, id }) => addCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
   
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editMutate, isEditing };
}
