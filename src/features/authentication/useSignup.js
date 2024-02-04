import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Successfully signed up, please check your email to verify your account"
      );
    },
    onError: () => {
      toast.error("Error signing up");
    },
  });

  return { signup, isSigningUp };
}
