import { parseArgs } from 'node:util'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  env: {
    type: 'string',
  },
  clean: {
    type: 'boolean',
  },
} as const;

async function main() {
  const { values: { env, clean } } = parseArgs({ options });
  console.log('Options',{ env, clean });

  switch (env) {
    case 'dev':

      break;

    case 'prod':

      break;

    default:
      break;
  }

  console.log(`Seeding ${env} done!`)
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
