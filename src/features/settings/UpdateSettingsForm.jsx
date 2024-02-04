import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import { useUpdateSettings } from "./useUpdateSettings";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
function UpdateSettingsForm() {
  const {
    settingsLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakFastPrice,
    } = {},
  } = useSettings();
  const { settingsMutate, mutateLoading } = useUpdateSettings();
  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    settingsMutate({ [field]: value });
  }

  settingsLoading && <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={mutateLoading}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={mutateLoading}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={mutateLoading}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          disabled={mutateLoading}
          onBlur={(e) => handleUpdate(e, "breakFastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
