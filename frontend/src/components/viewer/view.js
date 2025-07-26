import RoleGuard from '../../components/RoleGuard';
import ViewContent from '../../components/viewer/ViewContent';
import { ROLES } from '../../utils/constants';

export default function ViewerPage() {
  return (
    <RoleGuard roles={[ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER]}>
      <ViewContent />
    </RoleGuard>
  );
}