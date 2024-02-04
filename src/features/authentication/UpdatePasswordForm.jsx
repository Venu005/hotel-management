import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdatingUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSettled: reset() });
  }

  function handleReset(e) {
    e.preventDefault();
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          // this makes the form better for password managers
          autoComplete="current-password"
          disabled={isUpdatingUser}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdatingUser}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleReset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
