import Footer from "../shared/ui/Footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../shared/ui/Header/Header";

export default function Layout({user, settUser}) {
  return (
    <div>
      <Header user={user} setUser={settUser} />
      <main style={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh", 
          padding: "20px", 
          backgroundColor: "#f0eded",
        }}>
          
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
