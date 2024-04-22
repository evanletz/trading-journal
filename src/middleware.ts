import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: ["/"],
    afterAuth: async (auth, req) => {
      // Nice try, you need to sign-in
      if (!auth.userId && !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url })
      }
    }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};