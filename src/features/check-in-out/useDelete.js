import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useDelete() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/bookings");
    },
    onError: () =>
      toast.error("Error deleting booking, please try again later."),
  });

  return { deleteBooking, isDeleting };
}
