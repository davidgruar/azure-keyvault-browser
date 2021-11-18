import prompts from "prompts";
import { getSecret, listSecrets, listVaults } from './azureCli';
import { KeyVault, SecretListItem } from "./model";

const selectVault = async (vaults: KeyVault[]) => {
  const answer = await prompts({
    type: "autocomplete",
    name: "vault",
    message: "Choose a vault",
    choices: vaults.map((v) => ({ title: v.name, value: v })),
  });
  return answer.vault as KeyVault;
};

const selectSecret = async (secrets: SecretListItem[]) => {
  const answer = await prompts({
    type: "autocomplete",
    name: "secret",
    message: "Choose a secret",
    choices: secrets.map((s) => ({
      title: s.id.replace(/.+\//, ""),
      value: s,
    })),
    suggest: (input, choices) => Promise.resolve(choices.filter(c => c.title.includes(input))),
    limit: 20,
  });
  return answer.secret as SecretListItem;
};

(async () => {
  console.log("Loading vaults...");
  const vaults = listVaults();
  const vault = await selectVault(vaults);
  console.log("Loading secrets...");
  const secrets = listSecrets(vault.name);
  while (true) {
    const item = await selectSecret(secrets);
    const secret = getSecret(vault.name, item.id);
    console.log(secret.value);
  }
})();
