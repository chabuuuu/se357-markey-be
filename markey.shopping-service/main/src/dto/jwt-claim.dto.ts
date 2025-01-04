export class JwtClaimDto {
  id!: string;
  username!: string;
  permissionCodes!: string[];
  roleName!: string;
  shopId?: string;

  constructor(id: string, username: string, permissionCodes: string[], roleName: string, shopId?: string) {
    this.id = id;
    this.username = username;
    this.permissionCodes = permissionCodes;
    this.roleName = roleName;
    this.shopId = shopId;
  }
}
