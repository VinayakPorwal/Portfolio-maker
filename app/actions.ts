"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/database.types";
 

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/auth/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/auth/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/admin",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/auth/sign-in", error.message);
  }

  return redirect("/admin");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/sign-in");
};

export async function fetchPortfolioData() {
  try {
    const supabase = await createClient();
    // Fetch profile
    const { data: profile } = await supabase
      .from("profile")
      .select("*")
      .single();
    // Fetch profile
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .order("created_at");

    // Fetch skills
    const { data: skills } = await supabase
      .from("skills")
      .select("*")
      .order("created_at");

    // Fetch services
    const { data: services } = await supabase
      .from("services")
      .select("*")
      .order("created_at");

    // Fetch reviews
    const { data: reviews } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at");

    return { profile, skills, services, reviews, projects };
  } catch (err) {
    throw err;
  }
}

export async function updateProfile(updates: any, id: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("profile")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/admin')
    return data;
  } catch (err) {
    throw err;
  }
}

export async function submitContactForm(formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("contact_messages")
      .insert([formData]);

    if (error) throw error;
    revalidatePath('/admin')
    return { success: true };
  } catch (err) {
    throw err;
  }
}
export async function getContactData() {
  const supabase = await createClient();
  const { data: contact_messages } = await supabase.from("contact_messages").select("*");
  return contact_messages;
}

export async function addProject(
  project:  Database['public']['Tables']['projects']['Insert']
) {
  const supabase = await createClient();
  try {
    // const { data: { user } } = await supabase.auth.getUser();
    // project.user_id = user?.id;
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/admin')
    return data;
  } catch (err) {
    throw err;
  }
}


export async function updateProject(id: string, updates: Partial<Database['public']['Tables']['projects']['Row']>) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/admin')
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;
  } catch (err) {
    throw err;
  }
}

export async function addSkill(
  skill: Omit<Database['public']['Tables']['skills']['Row'], "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();
  try {
    // const { data: { user } } = await supabase.auth.getUser();
    // project.user_id = user?.id;
    const { data, error } = await supabase
      .from("skills")
      .insert([skill])
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/admin')
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateSkill(id: string, updates: Partial<Database['public']['Tables']['skills']['Row']>) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("skills")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/admin')  
    return data;
  } catch (err) {
    throw err;
  }
}
export async function deleteSkill(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) throw error;
    revalidatePath('/admin')  
  } catch (err) {
    throw err;
  }
}

export async function addService(
  service: Omit<Database['public']['Tables']['services']['Row'], "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("services").insert([service]).select().single();
    if (error) throw error; 
    revalidatePath('/admin')  
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateService(id: string, updates: Partial<Database['public']['Tables']['services']['Row']>) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single();
    if (error) throw error;
    revalidatePath('/admin')  
    return data;
  } catch (err) {
    throw err;
  }
}
export async function deleteService(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    revalidatePath('/admin')  
  } catch (err) {
    throw err;
  }
}

export async function addReview(
  review: Omit<Database['public']['Tables']['reviews']['Row'], "id" | "created_at" | "updated_at">
) {
  console.log(review)
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("reviews").insert([review]).select().single();
    if (error) throw error;
    revalidatePath('/admin')
    return data;
  } catch (err) {
    console.error(err)
    throw err;
  }
}
export async function deleteReview(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw error;
    revalidatePath('/admin')
  } catch (err) {
    throw err;
  }
}
export async function updateReview(id: string, updates: Partial<Database['public']['Tables']['reviews']['Row']>) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("reviews").update(updates).eq("id", id).select().single();
    if (error) throw error;
    revalidatePath('/admin')
    return data;
  } catch (err) {
    throw err;
  }
}


