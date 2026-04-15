import React, { useState, useRef, useCallback } from 'react';
import { uploadImage } from '../../services/file-upload.service';

/**
 * Convert a File to a base64 data URL.
 * Works across iframes (unlike blob URLs).
 * @param file file
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type ImageSourceMode = 'link' | 'upload';

interface ImageFieldValue {
  url: string;
  sourceMode: ImageSourceMode;
  _previewUrl?: string;
}

interface ImageFieldProps {
  value: ImageFieldValue;
  onChange: (value: ImageFieldValue) => void;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Upload failed';
}

/**
 * Custom Puck field for the Image component.
 * Provides two modes: paste a URL link, or upload an image to S3.
 * @param root0
 * @param root0.value
 * @param root0.onChange
 */
export function ImageField({ value, onChange }: ImageFieldProps) {
  const currentValue: ImageFieldValue =
    value && typeof value === 'object'
      ? value
      : { url: typeof value === 'string' ? value : '', sourceMode: 'link' };

  const [mode, setMode] = useState<ImageSourceMode>(
    currentValue.sourceMode || 'link'
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModeChange = useCallback(
    (newMode: ImageSourceMode) => {
      setMode(newMode);
      setError(null);
      onChange({ ...currentValue, sourceMode: newMode });
    },
    [currentValue, onChange]
  );

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ url: e.target.value, sourceMode: 'link' });
    },
    [onChange]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be under 10MB');
        return;
      }

      // Convert to base64 data URL for immediate preview (works across iframes)
      const dataUrl = await fileToDataUrl(file);

      // Show base64 preview immediately while upload runs (editor uses _previewUrl)
      // Keep url empty until S3 upload completes — generated apps use url, not _previewUrl
      onChange({
        url: currentValue.url || '',
        sourceMode: 'upload',
        _previewUrl: dataUrl,
      });

      setUploading(true);
      setError(null);

      try {
        const uploadedUrl = await uploadImage(file);
        // Keep base64 as _previewUrl for editor, store S3 url for generated app
        onChange({
          url: uploadedUrl,
          sourceMode: 'upload',
          _previewUrl: dataUrl,
        });
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [onChange]
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event('change', { bubbles: true })
        );
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Use _previewUrl (base64) for uploaded images, direct URL for link mode
  const previewSrc = currentValue._previewUrl || currentValue.url;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Mode Toggle */}
      <div style={toggleContainer}>
        <button
          type="button"
          onClick={() => handleModeChange('link')}
          style={{
            ...toggleBtn,
            ...(mode === 'link' ? toggleBtnActive : {}),
          }}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('upload')}
          style={{
            ...toggleBtn,
            ...(mode === 'upload' ? toggleBtnActive : {}),
          }}
        >
          Upload
        </button>
      </div>

      {/* Link Mode */}
      {mode === 'link' && (
        <input
          type="text"
          value={currentValue.url || ''}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          style={inputStyle}
        />
      )}

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div style={dropZone} onDrop={handleDrop} onDragOver={handleDragOver}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {uploading ? (
            <div style={{ textAlign: 'center', padding: 12 }}>
              <div style={spinner} />
              <div style={{ fontSize: 11, color: '#666', marginTop: 6 }}>
                Uploading...
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={uploadBtn}
            >
              Choose Image or Drag & Drop
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && <div style={{ fontSize: 11, color: '#d32f2f' }}>{error}</div>}

      {/* Preview */}
      {previewSrc && (
        <div style={previewContainer}>
          <img
            src={previewSrc}
            alt="Preview"
            style={previewImg}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.display = 'inline-block';
            }}
          />
          {currentValue.url && (
            <div style={urlText}>
              {currentValue.url.length > 60
                ? `${currentValue.url.slice(0, 60)}...`
                : currentValue.url}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Styles ────────────────────────────────────────────── */

const toggleContainer: React.CSSProperties = {
  display: 'flex',
  border: '1px solid #ddd',
  borderRadius: 4,
  overflow: 'hidden',
};

const toggleBtn: React.CSSProperties = {
  flex: 1,
  padding: '4px 8px',
  fontSize: 11,
  fontWeight: 600,
  border: 'none',
  background: '#fff',
  cursor: 'pointer',
  color: '#666',
};

const toggleBtnActive: React.CSSProperties = {
  background: '#0066CC',
  color: '#fff',
};

const inputStyle: React.CSSProperties = {
  padding: '4px 8px',
  border: '1px solid #ddd',
  borderRadius: 4,
  fontSize: 12,
  width: '100%',
  boxSizing: 'border-box',
};

const dropZone: React.CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: 6,
  padding: 8,
  textAlign: 'center',
  cursor: 'pointer',
};

const uploadBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#0066CC',
  fontSize: 11,
  fontWeight: 600,
  cursor: 'pointer',
  padding: '8px 12px',
  width: '100%',
};

const previewContainer: React.CSSProperties = {
  border: '1px solid #eee',
  borderRadius: 4,
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  alignItems: 'center',
  background: '#fafafa',
};

const previewImg: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: 120,
  objectFit: 'contain',
  borderRadius: 4,
};

const urlText: React.CSSProperties = {
  fontSize: 10,
  color: '#888',
  wordBreak: 'break-all',
  textAlign: 'center',
  lineHeight: 1.3,
};

const spinner: React.CSSProperties = {
  width: 20,
  height: 20,
  border: '2px solid #eee',
  borderTopColor: '#0066CC',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
  margin: '0 auto',
};
