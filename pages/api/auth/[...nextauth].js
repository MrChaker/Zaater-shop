import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google" 
        }
      },
      
    }),
    // ...add more providers here
  ],
  secret: process.env.secret,
  pages:{
    signIn: "/auth/signup"
  }
  /* theme: {
    
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#fe5349", // Hex color code
    logo: "/images/Redshirt.jpg" // Absolute URL to image
  } */
})