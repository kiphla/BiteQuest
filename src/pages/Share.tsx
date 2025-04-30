import React from "react";
import { useNavigate } from "react-router-dom";

const Share: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            position: "relative",
            background: "#000"
        }}>
            <img
                src="/fattoush.jpg"
                alt="Fake food photo"
                style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}
            />
            {/* Camera grid overlay */}
            <svg
                width="100vw"
                height="100vh"
                style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
            >
                <line x1="33.33vw" y1="0" x2="33.33vw" y2="100vh" stroke="#fff" strokeWidth="2" opacity="0.5" />
                <line x1="66.66vw" y1="0" x2="66.66vw" y2="100vh" stroke="#fff" strokeWidth="2" opacity="0.5" />
                <line x1="0" y1="33.33vh" x2="100vw" y2="33.33vh" stroke="#fff" strokeWidth="2" opacity="0.5" />
                <line x1="0" y1="66.66vh" x2="100vw" y2="66.66vh" stroke="#fff" strokeWidth="2" opacity="0.5" />
            </svg>
            {/* Camera button */}
            <div
                style={{
                    position: "absolute",
                    bottom: 48,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "6px solid #eee",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                    zIndex: 3,
                    cursor: "pointer"
                }}
                onClick={() => navigate("/review")}
            />
        </div>
    );
};

export default Share;