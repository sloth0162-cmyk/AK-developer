import { supabase } from "../../../supabaseClient"

function Login() {

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }

  return (
    <button onClick={signInWithGoogle}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      Sign in with Google
    </button>
  )
}

export default Login