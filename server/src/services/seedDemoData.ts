import sequelize from '@/config/db';
import { demoUsers } from '@/config/demoData';
import { createNewUser } from '@/services';

const seedDemoData = async () => {
  console.log('Starting demo data seeding...');
  const startTime = Date.now();

  const transaction = await sequelize.transaction();

  try {
    for (const demoUser of demoUsers) {
      const { photos, ...rest } = demoUser;

      await createNewUser({ ...rest, transaction });
    }

    await transaction.commit();

    console.log(
      `Seeded ${demoUsers.length} demo users successfully in ${Date.now() - startTime}ms.`,
    );
  } catch (error) {
    await transaction.rollback();
    console.error('Demo data seeding failed: ', error);
  }
};

export default seedDemoData;
