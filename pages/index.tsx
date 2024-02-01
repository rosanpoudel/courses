import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /courses route
    router.push("/courses?page=1");
  }, [router]);

  // Render nothing on the Home page, as the redirection will happen immediately
  return null;
};

export default Home;
