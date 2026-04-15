import { DropZone } from '@puckeditor/core';
import { useEffect, useMemo, useState } from 'react';
import { Heading, Tabs as AmplifyTab, Text, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Select } from './select';

/* ============================= */
/* Types */
/* ============================= */

type ThemeType = 'dark' | 'light';

type TabItem = {
  label: string;
  defaultContent?: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  activeTabIndex?: number;
  className?: string;
  customCss?: string;
  title?: string;
  subTitle?: string;
  TabItemPosition?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  theme?: ThemeType;
  backgroundImage?: string;
  backgroundColor?: string;
};

type SelectOption = {
  label: string;
  value: string;
};

/* ============================= */
/* Component */
/* ============================= */

const Tabs = ({
  tabs,
  activeTabIndex = 0,
  className = '',
  customCss,
  title,
  subTitle,
  TabItemPosition = 'center',
  theme = 'dark',
  backgroundImage,
  backgroundColor,
}: TabsProps) => {
  /* Unique class (stable) */
  const uniqueClass = useMemo(() => `tabs-${crypto.randomUUID()}`, []);

  /* Safe initial active tab */
  const initialActiveTab = tabs[activeTabIndex]?.label ?? tabs[0]?.label ?? '';

  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

  /* Sync when activeTabIndex changes */
  useEffect(() => {
    if (tabs[activeTabIndex]?.label) {
      setActiveTab(tabs[activeTabIndex].label);
    }
  }, [activeTabIndex, tabs]);

  const isDark = theme === 'dark';

  /* Memoized select options */
  const selectOptions: SelectOption[] = useMemo(
    () =>
      tabs.map((tab) => ({
        label: tab.label,
        value: tab.label,
      })),
    [tabs]
  );

  return (
    <View
      className={`puck-tabs ${className} ${uniqueClass}`}
      padding={{
        base: '2rem 1rem',
        xl: '60px 0 80px 0',
      }}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
    >
      {/* Custom CSS injection */}
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      {/* Subtitle */}
      {subTitle && (
        <Text
          textAlign="center"
          fontSize={{
            base: '16px',
            xl: '18px',
          }}
          margin="0 auto 0.5rem"
          color={isDark ? '#FFFFFF' : '#000000'}
        >
          {subTitle}
        </Text>
      )}

      {/* Title */}
      {title && (
        <Heading
          level={2}
          textAlign="center"
          marginBottom="1.5rem"
          color={isDark ? '#FFFFFF' : '#000000'}
        >
          {title}
        </Heading>
      )}

      <AmplifyTab.Container
        value={activeTab}
        onValueChange={(value: string) => setActiveTab(value)}
      >
        {/* ===================== */}
        {/* Mobile Select */}
        {/* ===================== */}
        <View
          margin="20px auto"
          display={{
            base: 'block',
            xl: 'none',
          }}
          maxWidth="230px"
          minHeight="48px"
          maxHeight="48px"
        >
          <Select
            options={selectOptions}
            selectedOption={
              activeTab
                ? {
                    label: activeTab,
                    value: activeTab,
                  }
                : null
            }
            onSelect={(selected: SelectOption | null) => {
              if (selected?.value) {
                setActiveTab(selected.value);
              }
            }}
            customControlStyles={{
              minHeight: '48px',
              textAlign: 'center',
              textAlignLast: 'center',
            }}
            placeholder="Select tab"
          />
        </View>

        {/* ===================== */}
        {/* Desktop Tabs */}
        {/* ===================== */}
        <AmplifyTab.List
          justifyContent={TabItemPosition}
          width="max-content"
          direction={{
            base: 'column',
            xl: 'row',
          }}
          margin="32px auto 43px"
          display={{
            base: 'none',
            xl: 'flex',
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab.label === activeTab;

            return (
              <AmplifyTab.Item
                key={tab.label}
                value={tab.label}
                color={isDark ? '#FFFFFF' : '#000000'}
                fontSize={{
                  base: '14px',
                  xl: '18px',
                }}
                fontWeight={400}
                style={{
                  borderBottomWidth: '4px',
                  borderBottomColor: isActive
                    ? isDark
                      ? '#FFFFFF'
                      : '#000000'
                    : 'transparent',
                }}
              >
                {tab.label}
              </AmplifyTab.Item>
            );
          })}
        </AmplifyTab.List>

        {/* ===================== */}
        {/* Tab Panels */}
        {/* ===================== */}
        {tabs.map((tab, index) => (
          <AmplifyTab.Panel
            key={tab.label}
            value={tab.label}
            padding={{
              base: '1rem 0',
              xl: '1.5rem 0',
            }}
            color={isDark ? '#FFFFFF' : '#000000'}
          >
            {tab.defaultContent && (
              <div
                style={{
                  marginBottom: '10px',
                }}
              >
                {tab.defaultContent}
              </div>
            )}

            <DropZone zone={`tab-${index}`} />
          </AmplifyTab.Panel>
        ))}
      </AmplifyTab.Container>
    </View>
  );
};

export default Tabs;
