import React from "react";
import Header from "@/containers/Header";
import Footer from "@/containers/Footer";
import Main from "@/containers/Main";
export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}
