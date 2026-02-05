import template from '../assets/template.svg';
export default function TemplateDrawer({
    isOpen,
    onClose,
    onSelectTemplate,
}) {
    if (!isOpen) return null;

    return (
        <>
            {/* BACKDROP */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    zIndex: 999,
                    backdropFilter: "blur(2px)",
                }}
            />

            {/* DRAWER PANEL */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "380px",
                    height: "100vh",
                    background: "#ffffff",
                    boxShadow: "-6px 0 25px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    animation: "slideIn 0.3s ease-out",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h2 style={{ margin: "0 0 2px", fontWeight: 600,  }}><span style={{ color: "#ff494e" }}>T</span>emplates</h2>
                        <p style={{ color: "#6b7280", marginTop: 0 }}>
                            Choose a template to apply to your page
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            border: "none",
                            background: "transparent",
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div style={{ padding: "20px", flex: 1 }}>

                    <div
                        onClick={() => onSelectTemplate("default")}
                        style={{
                            padding: "14px",
                            marginBottom: "12px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#f9fafb")
                        }
                    >
                        <strong>Template 1</strong>
                        <img src={template} alt="Template 1" style={{ marginTop: "10px" }} />
                        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#6b7280" }}>
                            Title + hero section + tabs + button
                        </p>
                    </div>
                </div>
            </div>

            <style>
                {`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        `}
            </style>
        </>
    );
}