/**
 * Mock Authentication Service for Frontend-Only Development Phase
 * Designed with standard async method signatures for seamless 1:1 replacement
 * with real backend APIs in Phase 2/3.
 */

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'employee' | 'worker';

export interface MockAuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
  avatar?: string;
  designation?: string;
}

export interface MockLoginResult {
  success: boolean;
  user?: MockAuthUser;
  redirectUrl?: string;
  error?: string;
}

// Pre-configured mock user database for frontend authentication simulation
const MOCK_CREDENTIALS: Array<{
  email: string;
  password: string;
  user: MockAuthUser;
  redirectUrl: string;
}> = [
  {
    email: 'admin@gmail.com',
    password: 'admin@123',
    redirectUrl: '/admin/dashboard',
    user: {
      id: 'usr_admin_001',
      name: 'Cool Admin',
      email: 'admin@gmail.com',
      role: 'admin',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      designation: 'Managing Director / Business Admin',
    },
  },
  {
    email: 'superadmin@gmail.com',
    password: 'super@123',
    redirectUrl: '/dashboard',
    user: {
      id: 'usr_superadmin_001',
      name: 'System Super Admin',
      email: 'superadmin@gmail.com',
      role: 'super_admin',
      organizationId: 'org_platform_root',
      organizationName: 'Platform Central',
      designation: 'System Administrator',
    },
  },
  {
    email: 'cooladmin@gmail.com',
    password: 'cool@123',
    redirectUrl: '/admin/dashboard',
    user: {
      id: 'usr_admin_001',
      name: 'Cool Admin',
      email: 'cooladmin@gmail.com',
      role: 'admin',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      designation: 'Managing Director / Business Admin',
    },
  },
  {
    email: 'admin@cooltechuae.com',
    password: 'cool@123',
    redirectUrl: '/admin/dashboard',
    user: {
      id: 'usr_admin_002',
      name: 'Enterprise Admin',
      email: 'admin@cooltechuae.com',
      role: 'admin',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      designation: 'Chief Operating Officer',
    },
  },
  {
    email: 'superadmin@crmplatform.io',
    password: 'super@123',
    redirectUrl: '/dashboard',
    user: {
      id: 'usr_superadmin_001',
      name: 'System Super Admin',
      email: 'superadmin@crmplatform.io',
      role: 'super_admin',
      organizationId: 'org_platform_root',
      organizationName: 'Platform Central',
      designation: 'System Administrator',
    },
  },
  {
    email: 'manager@gmail.com',
    password: 'manager@123',
    redirectUrl: '/manager/dashboard',
    user: {
      id: 'usr_manager_001',
      name: 'muhammed Shibil',
      email: 'manager@gmail.com',
      role: 'manager',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      designation: 'Operations Manager',
    },
  },
  {
    email: 'manager@cooltechuae.com',
    password: 'manager@123',
    redirectUrl: '/manager/dashboard',
    user: {
      id: 'usr_manager_001',
      name: 'muhammed Shibil',
      email: 'manager@cooltechuae.com',
      role: 'manager',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      designation: 'Operations Manager',
    },
  },
  {
    email: 'shibil@cooltechuae.com',
    password: 'cool@123',
    redirectUrl: '/manager/dashboard',
    user: {
      id: 'usr_manager_002',
      name: 'muhammed Shibil',
      email: 'shibil@cooltechuae.com',
      role: 'manager',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      designation: 'Operations Manager',
    },
  },
  {
    email: 'employee@cooltechuae.com',
    password: 'employee@123',
    redirectUrl: '/worker/dashboard',
    user: {
      id: 'usr_employee_001',
      name: 'Jordan Hayes',
      email: 'employee@cooltechuae.com',
      role: 'employee',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      designation: 'Field Operations Specialist',
    },
  },
  {
    email: 'employee@gmail.com',
    password: 'employee@123',
    redirectUrl: '/worker/dashboard',
    user: {
      id: 'usr_employee_001',
      name: 'Jordan Hayes',
      email: 'employee@gmail.com',
      role: 'employee',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      designation: 'Field Operations Specialist',
    },
  },
  {
    email: 'worker@cooltechuae.com',
    password: 'worker@123',
    redirectUrl: '/worker/dashboard',
    user: {
      id: 'usr_worker_001',
      name: 'Jordan Hayes',
      email: 'worker@cooltechuae.com',
      role: 'employee',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      designation: 'Field Operations Specialist',
    },
  },
  {
    email: 'worker@gmail.com',
    password: 'worker@123',
    redirectUrl: '/worker/dashboard',
    user: {
      id: 'usr_worker_001',
      name: 'Jordan Hayes',
      email: 'worker@gmail.com',
      role: 'employee',
      organizationId: 'org_cool_tech_001',
      organizationName: 'Cool Technologies LLC',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      designation: 'Field Operations Specialist',
    },
  },
];

export const authMockService = {
  /**
   * Simulates async user authentication and determines destination based on verified role
   */
  async login(email: string, password: string, rememberMe = true): Promise<MockLoginResult> {
    // Simulate brief network latency for realistic loading state
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check dynamically created Admins in localStorage
    if (typeof window !== 'undefined') {
      try {
        const storedAdminsRaw = localStorage.getItem('crm_admin_accounts_list');
        if (storedAdminsRaw) {
          const storedAdmins = JSON.parse(storedAdminsRaw);
          if (Array.isArray(storedAdmins)) {
            const adminMatch = storedAdmins.find(
              (a: any) =>
                (a.email?.trim().toLowerCase() === normalizedEmail ||
                 a.username?.trim().toLowerCase() === normalizedEmail) &&
                (a.password === password || !a.password)
            );
            if (adminMatch) {
              if (adminMatch.status === 'Inactive') {
                return {
                  success: false,
                  error: 'This admin account has been deactivated. Please contact your Super Admin.',
                };
              }
              const mockUser: MockAuthUser = {
                id: adminMatch.id || `usr_${Date.now()}`,
                name: adminMatch.name,
                email: adminMatch.email,
                role: 'admin',
                organizationId: adminMatch.organizationId || 'org_cool_tech_001',
                organizationName: adminMatch.organizationName || 'Cool Technologies LLC',
                avatar: adminMatch.avatar,
                designation: adminMatch.designation || 'Admin',
              };
              const sessionData = {
                authenticated: true,
                user: mockUser,
                role: 'admin',
                rememberMe,
                timestamp: Date.now(),
              };
              localStorage.setItem('cool_crm_auth', JSON.stringify(sessionData));
              if (rememberMe) {
                localStorage.setItem('cool_crm_remember_email', normalizedEmail);
              }
              return {
                success: true,
                user: mockUser,
                redirectUrl: '/admin/dashboard',
              };
            }
          }
        }
      } catch (e) {
        console.error('Error checking crm_admin_accounts_list during login:', e);
      }

      // 2. Check dynamically created Users in Settings (cezcon_crm_users_list)
      try {
        const storedUsersRaw = localStorage.getItem('cezcon_crm_users_list');
        if (storedUsersRaw) {
          const storedUsers = JSON.parse(storedUsersRaw);
          if (Array.isArray(storedUsers)) {
            const userMatch = storedUsers.find((u: any) => {
              const uEmail = u.email ? u.email.trim().toLowerCase() : '';
              const uUsername = u.username ? u.username.trim().toLowerCase() : '';
              const uPrefix = uUsername.split('@')[0];
              const isMatchIdentifier =
                uEmail === normalizedEmail ||
                uUsername === normalizedEmail ||
                uPrefix === normalizedEmail;
              // If password is saved on user record, check it; if not saved (created earlier without password), accept it
              const isMatchPassword = !u.password || u.password === password;
              return isMatchIdentifier && isMatchPassword;
            });

            if (userMatch) {
              if (userMatch.status === 'Inactive') {
                return {
                  success: false,
                  error: 'This account has been deactivated.',
                };
              }
              const isAdm = userMatch.isAdmin || (userMatch.profileType && userMatch.profileType.toLowerCase().includes('admin'));
              const isMgr = userMatch.profileType && userMatch.profileType.toLowerCase().includes('manager');
              const userRole: UserRole = isAdm ? 'admin' : isMgr ? 'manager' : 'employee';
              const mockUser: MockAuthUser = {
                id: `usr_${userMatch.id}`,
                name: userMatch.name,
                email: userMatch.email || normalizedEmail,
                role: userRole,
                organizationId: 'org_cool_tech_001',
                organizationName: 'Cool Technologies LLC',
                avatar: userMatch.avatarImage,
                designation: userMatch.designation || userMatch.profileType || 'Team Member',
              };
              const sessionData = {
                authenticated: true,
                user: mockUser,
                role: userRole,
                rememberMe,
                timestamp: Date.now(),
              };
              localStorage.setItem('cool_crm_auth', JSON.stringify(sessionData));
              if (rememberMe) {
                localStorage.setItem('cool_crm_remember_email', normalizedEmail);
              }
              return {
                success: true,
                user: mockUser,
                redirectUrl: isAdm ? '/admin/dashboard' : isMgr ? '/manager/dashboard' : '/worker/dashboard',
              };
            }
          }
        }
      } catch (e) {
        console.error('Error checking cezcon_crm_users_list during login:', e);
      }
    }

    // 3. Fallback to predefined static accounts
    const match = MOCK_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === normalizedEmail && c.password === password
    );

    if (!match) {
      return {
        success: false,
        error: 'Invalid email address or password. Please try again.',
      };
    }

    // Store active mock auth session
    if (typeof window !== 'undefined') {
      try {
        const sessionData = {
          authenticated: true,
          user: match.user,
          role: match.user.role,
          rememberMe,
          timestamp: Date.now(),
        };
        localStorage.setItem('cool_crm_auth', JSON.stringify(sessionData));
        if (rememberMe) {
          localStorage.setItem('cool_crm_remember_email', normalizedEmail);
        } else {
          localStorage.removeItem('cool_crm_remember_email');
        }
      } catch (err) {
        console.error('Local storage error during authentication:', err);
      }
    }

    return {
      success: true,
      user: match.user,
      redirectUrl: match.redirectUrl,
    };
  },

  /**
   * Reads currently active mock session
   */
  getCurrentUser(): MockAuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem('cool_crm_auth');
      if (!data) return null;
      const parsed = JSON.parse(data);
      return parsed.user || null;
    } catch {
      return null;
    }
  },

  /**
   * Clears mock session on logout
   */
  logout(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('cool_crm_auth');
      } catch (err) {
        console.error('Error during logout cleanup:', err);
      }
    }
  },
};
