export type KeyVault = {
  id: string;
  location: string;
  name: string;
  resourceGroup: string;
  tags: Record<string, string>;
  type: string;
};

export type SecretListItem = {
  id: string;
  tags: Record<string, string>;
};

export type Secret = {
  contentType: string;
  id: string;
  tags: Record<string, string>;
  value: string;
}