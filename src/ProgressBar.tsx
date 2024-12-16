import React from "react";

interface ProgressBarProps {
  progress: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.bar, width: `${progress}%` }}>
        <span style={styles.label}>{label}</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "30px",
    backgroundColor: "#f5deb3", 
    borderRadius: "15px",
    overflow: "hidden",
    position: "relative",
  },
  bar: {
    height: "100%",
    backgroundColor: "orange",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "10px",
    borderRadius: "15px 0 0 15px",
    position: "relative",
    transition: "width 0.3s ease", 
  },
  label: {
    color: "black",
    fontWeight: "bold",
    zIndex: 1,
  },
};

export default ProgressBar;