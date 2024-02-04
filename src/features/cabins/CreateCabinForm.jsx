import {Input} from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // custom hook for creating cabin
  const { createMutate, isCreating } = useCreateCabin();
  // custom hook for editing cabin
  const { editMutate, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editMutate(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createMutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {" "}
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : " Create a cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

// import styled from "styled-components";

// import { Input } from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm, useWatch } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// function CreateCabinForm() {
//   const { register, handleSubmit, reset, getValues } = useForm();

//   const queryClient = useQueryClient();
//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: addCabin,
//     onSuccess: () => {
//       toast.success("Cabin added");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       reset();
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
//   function onSubmit(data) {
//     mutate(data);
//   }
//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Price should be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "Can't be empty, make it at least 0",
//             validate: (value) =>
//               getValues().regularPrice >= value ||
//               "Discount should be less than regular price",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
