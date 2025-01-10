import React, { useEffect } from "react";

const TawkToScript = () => {
  useEffect(() => {
    // Créez le script Tawk.to
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/67808090af5bfec1dbe985c4/default";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Insérez le script dans le body
    document.body.appendChild(script);

    // Nettoyez le script quand le composant est démonté
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Pas de contenu visible
};

export default TawkToScript;