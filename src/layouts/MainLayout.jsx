import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className="App">
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
