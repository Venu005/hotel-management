import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function addCabin(newCabin, id) {
  // this function works for both editing the cabin and also creating a new cabin
  // also checking if the cabin has the image file or the image url
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  let query = supabase.from("cabins");

  // creating
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // editing
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // uploading the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin Image upload failed and cabin was not created");
  }
  return data;
}

export async function updateCabin() {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
