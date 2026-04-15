import { DropZone } from '@puckeditor/core';
import { useEffect } from 'react';
import { megaMenuStore } from './zone';

interface MegaMenuProps {
  id: string;
  isOpen?: boolean;
  backgroundColor?: string;
  className?: string;
  customCss?: string;
}

const MegaMenu = (props: MegaMenuProps) => {
  const { id, isOpen, backgroundColor, className, customCss } = props;

  const uniqueClass = `id-${id}`;
  const zoneKey = id;

  useEffect(() => {
    megaMenuStore.addOrUpdate({
      id,
      isOpen,
      backgroundColor,
      className,
      customCss,
      content: [],
      zones: {},
    });
  }, [id]);

  if (!isOpen) return null;

  return (
    <>
      {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

      <div
        className={`${className || ''} ${uniqueClass}`}
        style={{
          position: 'relative',
          inset: '60px 0px 0px',
          paddingTop: '30px',
          backgroundColor,
          zIndex: 9999999,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <DropZone zone={zoneKey} />
      </div>
    </>
  );
};

export default MegaMenu;
