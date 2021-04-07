import React from "react";
import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";

const Main: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="main">
        <Navigation />
      </main>
    </>
  );
};

export default Main;
