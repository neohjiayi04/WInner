const ADMIN_USERS_KEY = "exabytes-admin-users";

const SEED_USERS = [
  { id: "u1", companyName: "ABC Manufacturing Sdn Bhd", industry: "Manufacturing", location: "Penang", contactName: "Ahmad Faizal", email: "faizal@abcmfg.my", companySize: "51+ employees", growthScore: 68, digitalScore: 54, role: "User", status: "active", joinedDate: "2026-08-24" },
  { id: "u2", companyName: "JTC Marketing", industry: "Professional Services", location: "Selangor", contactName: "Jessica Tan", email: "jessica@jtcmarketing.my", companySize: "6-20 employees", growthScore: 74, digitalScore: 61, role: "User", status: "active", joinedDate: "2026-08-23" },
  { id: "u3", companyName: "Kedai Runcit Aina", industry: "Retail & E-commerce", location: "Johor", contactName: "Aina Ismail", email: "aina.ismail@example.my", companySize: "1-5 employees", growthScore: 52, digitalScore: 31, role: "User", status: "active", joinedDate: "2026-08-22" },
  { id: "u4", companyName: "Nova Builders", industry: "Construction", location: "Kuala Lumpur", contactName: "Ravi Kumar", email: "ravi@novabuilders.my", companySize: "21-50 employees", growthScore: 61, digitalScore: 45, role: "User", status: "active", joinedDate: "2026-08-21" },
  { id: "u5", companyName: "Marcus Tan (Advisor)", industry: "Advisory", location: "Kuala Lumpur", contactName: "Marcus Tan", email: "marcus.tan@exabytes.my", companySize: "N/A", growthScore: null, digitalScore: null, role: "Advisor", status: "active", joinedDate: "2026-07-02" },
  { id: "u6", companyName: "Suspicious Test Account", industry: "Retail & E-commerce", location: "Unknown", contactName: "Unverified User", email: "test123@example.com", companySize: "1-5 employees", growthScore: 12, digitalScore: 8, role: "User", status: "blocked", joinedDate: "2026-08-25" }
];

function loadAdminUsers() {
  try {
    const raw = localStorage.getItem(ADMIN_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(SEED_USERS));
  return SEED_USERS.slice();
}

function saveAdminUsers(users) {
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
}

function getAdminUserById(id) {
  return loadAdminUsers().find(u => u.id === id) || null;
}

function updateAdminUserRole(id, role) {
  const users = loadAdminUsers();
  const user = users.find(u => u.id === id);
  if (!user) return null;
  user.role = role;
  saveAdminUsers(users);
  return user;
}

function updateAdminUserStatus(id, status) {
  const users = loadAdminUsers();
  const user = users.find(u => u.id === id);
  if (!user) return null;
  user.status = status;
  saveAdminUsers(users);
  return user;
}

/* ---------- ADMIN'S OWN ACCOUNT (profile/settings) ---------- */
const ADMIN_ACCOUNT_KEY = "exabytes-admin-account";

const SEED_ADMIN_ACCOUNT = {
  name: "Admin User",
  email: "admin@exabytes.my",
  role: "Administrator",
  password: "admin123"
};

function loadAdminAccount() {
  try {
    const raw = localStorage.getItem(ADMIN_ACCOUNT_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(SEED_ADMIN_ACCOUNT));
  return { ...SEED_ADMIN_ACCOUNT };
}

function saveAdminAccount(account) {
  localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(account));
}

function updateAdminAccountProfile(name, email) {
  const account = loadAdminAccount();
  account.name = name;
  account.email = email;
  saveAdminAccount(account);
  return account;
}

function updateAdminPassword(currentPassword, newPassword) {
  const account = loadAdminAccount();
  if (account.password !== currentPassword) {
    return { success: false, message: "Current password is incorrect." };
  }
  account.password = newPassword;
  saveAdminAccount(account);
  return { success: true, message: "Password updated." };
}

window.AdminData = { loadAdminUsers, saveAdminUsers, getAdminUserById, updateAdminUserRole, updateAdminUserStatus, loadAdminAccount, saveAdminAccount, updateAdminAccountProfile, updateAdminPassword };