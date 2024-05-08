import { useEffect, useState } from "react";

const Footer = () => {
    const [year, setYear] = useState<any>();
    useEffect(() => {
      setYear(new Date().getFullYear())
    }, [])
    return (
      <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between">
        <p className="text-muted text-center text-md-left">Copyright © {year} Dominoes. All rights reserved</p>
      </footer>
    );
  };

  export default Footer
  