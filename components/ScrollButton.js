import React, { useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

const ScrollButton = () => {

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (typeof window !== "undefined") {
      window.addEventListener('scroll', toggleVisible);
  }

  return (
    <div>
      <ArrowUpOutlined onClick={scrollToTop}
        style={{
          display: visible ? 'flex' : 'none', cursor: "pointer",
          color: "white", fontSize: "1.5rem", position: "fixed", bottom: "40px", zIndex: "1", left: "95%", backgroundColor: "black", borderRadius: "10%" ,width: "40px",height: "40px", justifyContent: "center", alignItems: "center"
        }} />
    </div>
  );
}

export default ScrollButton;