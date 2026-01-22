import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
