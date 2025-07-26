import RoleGuard from '../../components/RoleGuard';
import UserManagement from '../../components/admin/UserManagement';
import { ROLES } from '../../utils/constants';

export default function AdminUsers() {
  return (
    <RoleGuard roles={[ROLES.ADMIN]}>
      <UserManagement />
    </RoleGuard>
  );
}