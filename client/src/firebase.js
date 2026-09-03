import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Call this function when the user clicks your "Sign in with Google" button
export const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        // This gives you a Google Access Token to access Google APIs if needed
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info
        const user = result.user;
        console.log("Success! Signed in as:", user.displayName);
        return user;
    } catch (error) {
        console.error("Error during sign-in:", error.message);
    }
};

export { auth, provider, };