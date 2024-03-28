import { ref } from "vue";
import useSupabase from "@/utils/UseSupabase";
// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();
  /**
   * Login with email and password
   */
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
  };

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async(provider) => {
    const { user, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
    return user;
  };

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value;
  };

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password, options:{
        data: {
          first_name: meta.name
        }
      } },
      { 
        //arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method

        // data: meta,

        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side            // but since we're all on the client it will work fine
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
          }
    );
    if (error) throw error;

    // ------------
  //   const { data, error: dbError } = await supabase
  //   .from('users')
  //   .insert([
  //     { name },
  //   ])
  
  // if (dbError) {
  //   console.error('Error saving userName:', dbError.message)
  // }
   // ------------  

    return user;
  };

  /**
   * Update user email, password, or meta data
   */

  const update = async ({email, password}) => {
    const { user, error } = await supabase.auth.updateUser({email, password},
      // { 
      //   redirectTo: `${window.location.origin}`,
      //     }
      );
    if (error) throw error;
    return user;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
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
    // maybeHandleEmailConfirmation,
  };
}