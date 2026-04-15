import MegaMenuRenderer from './MegaMenu';

export const MegaMenu = {
  label: 'Mega Menu',

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolveFields: (_data: any) => ({
    isOpen: {
      type: 'radio',
      label: 'Mega menu state',
      options: [
        {
          label: 'Closed',
          value: false,
        },
        {
          label: 'Open',
          value: true,
        },
      ],
    },

    backgroundColor: {
      type: 'text',
      label: 'Background color',
    },

    className: {
      type: 'text',
      label: 'Custom class',
    },

    customCss: {
      type: 'textarea',
      label: 'Custom CSS',
    },
  }),

  defaultProps: {
    isOpen: true,
    backgroundColor: '#ffffff',
    className: 'mega-menu-001',
    customCss: '',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: any) => <MegaMenuRenderer {...props} />,
};
