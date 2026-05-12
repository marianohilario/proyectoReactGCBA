import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.css";
import WhatsApp from "../whatsApp/WhatsApp";

const Layout = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      <WhatsApp />
      <Footer />
    </div>
  );
};

export default Layout;
