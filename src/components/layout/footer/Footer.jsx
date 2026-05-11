import { useEffect, useState } from "react";
import NosotrosList from "./nosotrosList/NosotrosList";
import Loader from "../../Loader";
const Footer = () => {
  const [nosotros, setNosotros] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("/data/nosotros.json")
        .then((response) => response.json())
        .then((data) => {
          setNosotros(data.nosotros);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 800);
  }, []);

  return (
    <footer
      style={{
        borderTop: "1px solid #cccccc80",
        padding: "10px",
        textAlign: "center",
        marginTop: "20px",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "234px",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Loader height="50px" />
        </div>
      ) : (
        <NosotrosList nosotros={nosotros} />
      )}
      <p style={{ fontSize: "13px" }}>&copy; 2026 - Mariano Hilario</p>
    </footer>
  );
};

export default Footer;
