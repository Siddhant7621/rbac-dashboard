import RoleGuard from '../../components/RoleGuard';
import ContentManagement from '../../components/editor/ContentManagement';
import { ROLES } from '../../utils/constants';

export default function EditorPosts() {
  return (
    <RoleGuard roles={[ROLES.ADMIN, ROLES.EDITOR]}>
      <ContentManagement />
    </RoleGuard>
  );
}