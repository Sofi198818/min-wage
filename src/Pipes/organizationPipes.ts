import { OrganizationType } from "../enam/organizationType";

export function GetStatusType(organizationType: OrganizationType) {
  if (OrganizationType.true) {
    return 'აქტიური';
  } else {
    return 'გაუქმებული';
  }
}
