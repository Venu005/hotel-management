import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // from local storage

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
export async function updateUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // let's say user want to update his avatar too
  // -> step 1 :  uploading the avatar to the storage
  // random logic tbh
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // -> step 2 : updating the user metadata
  const { data: updatedUser, error: err } = await supabase.auth.updateUser({
    data: {
      //${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (err) throw new Error(err.message);

  return updatedUser;
}
