import { ref } from "vue";
import useSupabase from "@/utils/UseSupabase";
const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();
   
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
  };
 
  // Todo: login with github
  const loginWithSocialProvider = async(provider) => {
    const { user, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
    return user;
  };
 
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  if (error) throw error;
  };
 
  const isLoggedIn = () => {
    return !!user.value;
  };
 
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password, options:{
        data: {
          first_name: meta.name
        }
      } },
      { 
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
          }
    );
    if (error) throw error;

    return user;
  };
 
  const update = async ({email, password}) => {
    const { user, error } = await supabase.auth.updateUser({email, password});
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error;
    return user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
  };
}