import { createUser } from "@/lib/auth";

async function main() {
  const user = await createUser(
    "teste@codaria.com",
    "senha123",
    "Usuário Teste"
  );
  console.log("Usuário criado:", user);
  process.exit(0);
}

main();