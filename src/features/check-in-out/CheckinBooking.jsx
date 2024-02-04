import { useEffect, useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useBooking } from "../../features/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";

import styled from "styled-components";

import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const { settingsLoading, settings } = useSettings();

  if (isLoading || settingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: opsBreakfast, // called extrasPrice in the database-- supabase
          totalPrice: totalPrice + opsBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  const opsBreakfast = settings?.breakFastPrice * numNights * numGuests;
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((addBreakFast) => !addBreakFast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add break fast for {formatCurrency(opsBreakfast)}.
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + opsBreakfast)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(opsBreakfast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
