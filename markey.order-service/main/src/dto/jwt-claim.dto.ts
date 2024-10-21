export class JwtClaimDto {
  id!: string;
  username!: string;
  permissionCodes!: string[];
  roleName!: string;

  constructor(id: string, username: string, permissionCodes: string[], roleName: string) {
    this.id = id;
    this.username = username;
    this.permissionCodes = permissionCodes;
    this.roleName = roleName;
  }
}
