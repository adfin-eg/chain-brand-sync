// Navigation structure transcribed from the user's menu screenshots.
// Module -> section heading -> pages. Icons are Phosphor names registered via `npm run icons:sync`.
export interface NavSection {
  title: string;
  pages: string[];
}
export interface NavModule {
  label: string;
  icon: string;
  sections: NavSection[];
}

export const NAV_MODULES: NavModule[] = [
  { label: 'Home', icon: 'house', sections: [] },
  {
    label: 'Item',
    icon: 'cube',
    sections: [
      {
        title: 'Item',
        pages: ['Item', 'Item segmentation', 'Item lists', 'Item group lists', 'Label printing', 'Label lists', 'Store Assortment', 'Supplier'],
      },
      { title: 'Shelf', pages: ['Shelf locations'] },
      { title: 'Price', pages: ['Price control', 'Store routines', 'Store prices'] },
      { title: 'Food', pages: ['Ingredients', 'Recipe items', 'Menus', 'Menu groups'] },
      { title: 'Item import', pages: ['Import', 'Items in import'] },
      { title: 'Setup', pages: ['Item registers', 'System parameters', 'Export'] },
      { title: 'Product catalog', pages: ['Product catalog', 'FAQ'] },
    ],
  },
  {
    label: 'Store',
    icon: 'map-pin',
    sections: [
      {
        title: 'Store groups',
        pages: ['All stores', 'Stores', 'All teams', 'Teams', 'All profiles', 'Profiles', 'All Regions', 'Profile groups', 'Companies'],
      },
      { title: 'Setup', pages: ['Postal codes', 'Export all stores', 'Opening hours', 'Store registers', 'System parameters'] },
    ],
  },
  {
    label: 'Financials',
    icon: 'credit-card',
    sections: [
      { title: 'Gift card', pages: ['Gift cards', 'Gift card balance', 'Images', 'Transactions'] },
      { title: 'Receipt management', pages: ['Receipt journal'] },
      { title: 'Credit note', pages: ['Credit notes'] },
      { title: 'Import', pages: ['Imports'] },
      { title: 'Settings', pages: ['Credit note and Gift card settings'] },
    ],
  },
  {
    label: 'Inventory',
    icon: 'stack-simple',
    sections: [
      { title: 'Stock', pages: ['Stock status', 'Transactions', 'Temporary storage'] },
      { title: 'Serial number', pages: ['Serial numbers'] },
      { title: 'Stocktaking', pages: ['Stocktakings', 'Count lists', 'Count groups'] },
      { title: 'Fuel control', pages: ['Tank reading', 'Tank fillings', 'Nozzles', 'Tanks', 'Tank groups'] },
      { title: 'Setup', pages: ['Reason codes', 'System parameters', 'Virtual stocks'] },
    ],
  },
  {
    label: 'Procurement',
    icon: 'shopping-cart',
    sections: [{ title: 'Purchasing', pages: ['Purchase orders', 'Items in purchase orders', 'Deliveries', 'Procurement registers'] }],
  },
  {
    label: 'Loyalty',
    icon: 'target',
    sections: [
      { title: 'Member', pages: ['Member identities', 'Member cards', 'Member statistics', 'Member segmentation'] },
      { title: 'Coupon', pages: ['Coupons', 'Coupons (On-premise)'] },
      { title: 'Stamp card', pages: ['Stamp cards'] },
      { title: 'Bonus', pages: ['Bonus', 'Bonus Rollouts'] },
      { title: 'Setup', pages: ['Loyalty programs', 'Bonus rules', 'Marketing distribution'] },
      { title: 'System parameters', pages: ['Coupon', 'Bonus'] },
    ],
  },
  {
    label: 'Customer',
    icon: 'user',
    sections: [
      { title: 'Sale', pages: ['Order dispatch dashboard', 'Service orders'] },
      { title: 'Customer', pages: ['Customers', 'Customer cards', 'Customer groups', 'Contacts', 'Customer orders', 'Offers'] },
      { title: 'System parameters', pages: ['Customer and member', 'Service order'] },
      { title: 'Service order', pages: ['Service locations'] },
    ],
  },
  {
    label: 'Reporting',
    icon: 'folder',
    sections: [
      { title: 'Reporting', pages: ['Dashboards'] },
      { title: 'Budget', pages: ['Budget'] },
      { title: 'Settlement', pages: ['EOBD log'] },
      { title: 'Admin', pages: ['Import log'] },
    ],
  },
  {
    label: 'Promotions',
    icon: 'chart-line',
    sections: [
      { title: 'Promotions', pages: ['Promotions', 'Items in promotions', 'Promotion offers'] },
      { title: 'Price', pages: ['Price rules', 'Price control', 'Items with price lock', 'Items with temporary net price'] },
      { title: 'Setup', pages: ['Promotion registers', 'System parameters'] },
    ],
  },
  {
    label: 'System',
    icon: 'gear',
    sections: [
      { title: 'User management', pages: ['Users', 'User roles', 'System parameters'] },
      { title: 'File management', pages: ['Files'] },
      { title: 'Mobile POS configuration', pages: ['Mobile POS Parameters', 'Mobile POS Softpay Mapping', 'Mobile POS Status', 'Configuration groups'] },
      {
        title: 'POS management',
        pages: ['Reason codes', 'POS Units', 'Default POS Units', 'POS master data import', 'POS API price validation', 'System parameters', 'POS API Receipts'],
      },
      { title: 'Flight management', pages: ['Flight data'] },
      { title: 'Instore management', pages: ['Parameters'] },
      { title: 'Dispatch management', pages: ['Dispatch rules'] },
      { title: 'Payment configuration', pages: ['Merchants', 'Payment providers', 'Coopay backup'] },
      { title: 'Account management', pages: ['Account configuration', 'User accounts'] },
      { title: 'Message distribution', pages: ['Email messages', 'Text messages', 'Distribution templates', 'Accounts'] },
    ],
  },
];
