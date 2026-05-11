import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.mainContainer}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
