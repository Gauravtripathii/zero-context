"use client";

import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const updateLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
  };
  return (
    <main className="w-full h-screen">
      <Header updateLoginStatus={updateLoginStatus} isLoggedIn={isLoggedIn} />
      <Main isLoggedIn={isLoggedIn} />
    </main>
  );
}
