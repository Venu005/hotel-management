import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: settingsMutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("settings updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      toast.error("Unable to update settings");
    },
  });

  return { settingsMutate, mutateLoading };
}
