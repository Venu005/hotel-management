import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryCLient.invalidateQueries({ active: true }); // can also pass the queryKey ['bookings'] but this is other way to do
      navigate("/");
    },
    onError: () =>
      toast.error("Error checking in booking, please try again later."),
  });

  return { checkin, isCheckingIn };
}
