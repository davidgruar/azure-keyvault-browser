import { execSync } from "child_process";
import { KeyVault, Secret, SecretListItem } from "./model";

export const az = <T>(command: string) => {
  try {
    const stdout = execSync(`az ${command}`, { encoding: "utf-8" });
    return JSON.parse(stdout) as T;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export const listVaults = () => az<KeyVault[]>("keyvault list");

export const listSecrets = (vaultName: string) =>
  az<SecretListItem[]>(`keyvault secret list --vault-name ${vaultName}`);

export const getSecret = (vaultName: string, secretId: string) =>
  az<Secret>(`keyvault secret show --vault-name ${vaultName} --id ${secretId}`);
