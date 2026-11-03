// SAMPLE DATA: invented by Claude, not real items. Shaped after the user's Items screenshots (columns, values, formats).
// The user will replace this with real mock data.
export interface Item {
  id: number;
  gtin: string;
  itemText: string;
  itemNumber: string;
  department: string;
  status: string;
  brand: string;
  supplierNumber: string;
  itemGroupNumber: string;
  supplierName: string;
  itemGroupText: string;
  modifiedDate: string;
  modifiedBy: string;
  createdDate: string;
  createdBy: string;
}

const SUPPLIERS = [
  { number: '1', name: 'EG Retail' },
  { number: '2', name: 'Biltema' },
  { number: '3', name: 'Nordic Foods (sample)' },
];
const GROUPS = [
  { number: '3025001', text: 'Eat' },
  { number: '1069002', text: 'Ready-to-Eat Meals' },
  { number: '1100009', text: 'Carrier Bags' },
  { number: '77777', text: 'Service Order Item' },
  { number: '3025002', text: 'Drink' },
];
const NAMES = ['Softis meny', 'Hvetebolle m/rosin', 'Kaffe kopp', 'Tompall', 'Tomlåda', 'Service-item', 'Isvaffel softis', 'Sjokoladepulver 700g'];
const DEPARTMENTS = ['Grocery', 'Specialist Trade'];
const STATUSES = ['Active', 'Active', 'Active', 'Draft'];
const BRANDS = ['', '', 'Strøssel', 'Meny', 'Biltema'];
const USERS = ['laram@eg.no', 'amalm@eg.se', 'jocwe@eg.se'];

const pad = (n: number) => String(n).padStart(2, '0');
// Format used in the grid: dd.MM.yyyy HH:mm
const stamp = (offsetMinutes: number) => {
  const d = new Date(Date.UTC(2026, 9, 27, 13, 27) - offsetMinutes * 60_000);
  return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
};

export const ITEMS_MOCK: Item[] = Array.from({ length: 2000 }, (_, i) => {
  const supplier = SUPPLIERS[i % SUPPLIERS.length];
  const group = GROUPS[(i * 7) % GROUPS.length];
  return {
    id: i + 1,
    gtin: i % 3 === 0 ? String(250 + (i % 50)) : String(7000000000000 + i * 7919),
    itemText: `${NAMES[i % NAMES.length]} ${i + 1}`,
    itemNumber: i % 4 === 0 ? String(100000 + i) : '',
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    status: STATUSES[i % STATUSES.length],
    brand: BRANDS[i % BRANDS.length],
    supplierNumber: supplier.number,
    itemGroupNumber: group.number,
    supplierName: supplier.name,
    itemGroupText: group.text,
    modifiedDate: stamp(i * 37),
    modifiedBy: USERS[i % USERS.length],
    createdDate: stamp(i * 37 + 600 + (i % 90)),
    createdBy: USERS[(i + 1) % USERS.length],
  };
});
