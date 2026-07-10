import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.css";
import WhatsApp from "../whatsApp/WhatsApp";

const Layout = () => {
  return (
    <div className={styles.mainLayout}>
      <Sidebar />
      <div className={styles.contentArea}>
        <Header />
        <main className={styles.mainContainer}>
          <Outlet />
        </main>
        <WhatsApp />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
