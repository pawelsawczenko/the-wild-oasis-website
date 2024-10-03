import Image from "next/image";
import { signInAction } from "../_lib/actions";

export const metadata = {
  tittle: "Login",
};

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium hover:border-accent-400 hover:text-accent-400 transition-colors">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
