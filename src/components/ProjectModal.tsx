import { useEffect } from "react";
import { Icon } from "../lib/icons";
import { asset } from "../lib/asset";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imgUrl: string;
  details?: Record<string, string>;
  url?: string;
}

export function ProjectModal({ isOpen, onClose, title, imgUrl, details, url }: ProjectModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Resolve image paths through the asset helper for correct base URL
  const resolvedImgUrl = imgUrl.startsWith("http") ? imgUrl : asset(imgUrl.startsWith("/") ? imgUrl.slice(1) : imgUrl);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(4, 4, 6, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      />
      {/* Modal Content container */}
      <div
        className="reveal"
        style={{
          position: "relative",
          background: "rgba(15, 15, 20, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Banner Image */}
        <div style={{ position: "relative", height: "240px", width: "100%", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: imgUrl.includes('Primary-01-01') ? 'rgba(255, 255, 255, 0.02)' : 'transparent' }}>
          <img
            src={resolvedImgUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: imgUrl.includes('Primary-01-01') ? "contain" : "cover",
              padding: imgUrl.includes('Primary-01-01') ? "24px" : "0",
              boxSizing: 'border-box'
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(15, 15, 20, 1) 0%, rgba(15, 15, 20, 0.3) 80%, transparent 100%)",
            }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.5)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Icon.Close style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        {/* Project Details Content */}
        <div style={{ padding: "32px", paddingTop: "0px" }}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "600",
              marginBottom: "24px",
              color: "#fff",
              lineHeight: "1.3",
            }}
          >
            {title}
          </h2>

          {details && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "24px",
              }}
            >
              {Object.entries(details).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "150px 1fr",
                    gap: "16px",
                    fontSize: "14.5px",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      marginTop: "2px",
                    }}
                  >
                    {key}
                  </span>
                  <span style={{ color: "var(--text-dim)", lineHeight: "1.5" }}>{val}</span>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "36px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "24px",
            }}
          >
            {url && url !== "#" && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                Visit Website <Icon.Arrow />
              </a>
            )}
            <button className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
