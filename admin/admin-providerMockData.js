const PROVIDERS_KEY = "exabytes-admin-providers";

const SEED_PROVIDERS = [
  { id: "p1", companyName: "Zoho Malaysia", category: "CRM & Productivity", contactName: "Wei Ling Chan", email: "weiling@zoho.my", solutionsCount: 4, status: "pending", submittedDate: "2026-09-05", description: "Applying to list 4 solutions under CRM & Productivity." },
  { id: "p2", companyName: "Billplz", category: "Payments", contactName: "Hafiz Rahman", email: "hafiz@billplz.com", solutionsCount: 1, status: "pending", submittedDate: "2026-09-03", description: "Applying to list payment gateway integration solutions." },
  { id: "p3", companyName: "Autocount Cloud", category: "Accounting", contactName: "Grace Lim", email: "grace@autocount.com", solutionsCount: 3, status: "active", submittedDate: "2026-06-12", description: "Cloud accounting and payroll software provider." },
  { id: "p4", companyName: "StoreHub", category: "Retail & POS", contactName: "Daniel Ooi", email: "daniel@storehub.com", solutionsCount: 5, status: "active", submittedDate: "2026-04-02", description: "Point-of-sale and inventory management for retail SMEs." },
  { id: "p5", companyName: "HubEngage", category: "Sales & Marketing", contactName: "Unknown", email: "contact@hubengage.example", solutionsCount: 2, status: "flagged", submittedDate: "2026-08-30", description: "Flagged for suspected spam content by another provider." },
  { id: "p6", companyName: "Xero Malaysia", category: "Accounting", contactName: "Melissa Tan", email: "melissa@xero.my", solutionsCount: 2, status: "active", submittedDate: "2026-02-18", description: "Cloud-based accounting software for small businesses." }
];

function loadProviders() {
  try {
    const raw = localStorage.getItem(PROVIDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(PROVIDERS_KEY, JSON.stringify(SEED_PROVIDERS));
  return SEED_PROVIDERS.slice();
}

function saveProviders(list) {
  localStorage.setItem(PROVIDERS_KEY, JSON.stringify(list));
}

function getProviderById(id) {
  return loadProviders().find(p => p.id === id) || null;
}

function updateProviderStatus(id, status) {
  const list = loadProviders();
  const provider = list.find(p => p.id === id);
  if (!provider) return null;
  provider.status = status;
  saveProviders(list);
  return provider;
}

window.ProviderData = { loadProviders, saveProviders, getProviderById, updateProviderStatus };