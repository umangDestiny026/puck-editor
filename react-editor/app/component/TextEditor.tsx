import React, { useId } from "react";

type TextEditorProps = {
    content?: React.ReactNode;
    className?: string;
    customCss?: string;
};

const TextEditor: React.FC<TextEditorProps> = ({
    content,
    className = "",
    customCss,
}) => {
    const id = useId();
    const uniqueClass = `text-${id.replace(/:/g, "")}`;

    return (
        <div className={`${uniqueClass} ${className}`}>
            {customCss && (
                <style>
                    {`
            .${uniqueClass} {
              ${customCss}
            }
          `}
                </style>
            )}

            {content}
        </div>
    );
};

export default TextEditor;