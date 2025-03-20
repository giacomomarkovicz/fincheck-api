// prisma/seed.ts
import { PrismaClient, TransactionType, BankAccountType } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()

async function main(): Promise<void> {
  // Seed para usuários
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      name: 'Usuário 1',
      email: 'user1@example.com',
      password: await hash('password123', 12)
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      name: 'Usuário 2',
      email: 'user2@example.com',
      password: await hash('password123', 12)
    }
  })

  // Seed para contas bancárias
  const account1 = await prisma.bankAccount.create({
    data: {
      userId: user1.id,
      name: 'Conta Corrente',
      initialBalance: 1000.0,
      type: BankAccountType.CHECKING,
      color: '#FF5733'
    }
  })

  // Seed para categorias
  await prisma.category.createMany({
    data: [
      { userId: user1.id, name: 'Salário', icon: 'salary', type: 'INCOME' },
      {
        userId: user1.id,
        name: 'Freelance',
        icon: 'freelance',
        type: 'INCOME'
      },
      { userId: user1.id, name: 'Outro', icon: 'other', type: 'INCOME' },
      // Expense
      { userId: user1.id, name: 'Casa', icon: 'home', type: 'EXPENSE' },
      { userId: user1.id, name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
      {
        userId: user1.id,
        name: 'Educação',
        icon: 'education',
        type: 'EXPENSE'
      },
      { userId: user1.id, name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
      { userId: user1.id, name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
      { userId: user1.id, name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
      {
        userId: user1.id,
        name: 'Transporte',
        icon: 'transport',
        type: 'EXPENSE'
      },
      { userId: user1.id, name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
      { userId: user1.id, name: 'Outro', icon: 'other', type: 'EXPENSE' }
    ]
  })

  // Seed para categorias
  await prisma.category.createMany({
    data: [
      { userId: user2.id, name: 'Salário', icon: 'salary', type: 'INCOME' },
      {
        userId: user2.id,
        name: 'Freelance',
        icon: 'freelance',
        type: 'INCOME'
      },
      { userId: user2.id, name: 'Outro', icon: 'other', type: 'INCOME' },
      // Expense
      { userId: user2.id, name: 'Casa', icon: 'home', type: 'EXPENSE' },
      { userId: user2.id, name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
      {
        userId: user2.id,
        name: 'Educação',
        icon: 'education',
        type: 'EXPENSE'
      },
      { userId: user2.id, name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
      { userId: user2.id, name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
      { userId: user2.id, name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
      {
        userId: user2.id,
        name: 'Transporte',
        icon: 'transport',
        type: 'EXPENSE'
      },
      { userId: user2.id, name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
      { userId: user2.id, name: 'Outro', icon: 'other', type: 'EXPENSE' }
    ]
  })

  const user1Categories = await prisma.category.findMany({
    where: { userId: user1.id }
  })

  // Seed para transações
  await prisma.transaction.createMany({
    data: [
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user1Categories[0].id,
        name: 'Compra no mercado',
        value: 150.0,
        date: new Date(),
        type: TransactionType.EXPENSE
      },
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user1Categories[1].id,
        name: 'Passagem de ônibus',
        value: 4.5,
        date: new Date(),
        type: TransactionType.EXPENSE
      },
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user1Categories[2].id,
        name: 'Cinema',
        value: 40.0,
        date: new Date(),
        type: TransactionType.EXPENSE
      },
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user1Categories[3].id,
        name: 'Recebimento de Salário',
        value: 3000.0,
        date: new Date(),
        type: TransactionType.INCOME
      }
    ]
  })

  const user2Categories = await prisma.category.findMany({
    where: { userId: user2.id }
  })

  await prisma.transaction.createMany({
    data: [
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user2Categories[0].id,
        name: 'Compra no mercado',
        value: 150.0,
        date: new Date(),
        type: TransactionType.EXPENSE
      },
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user2Categories[1].id,
        name: 'Passagem de ônibus',
        value: 4.5,
        date: new Date(),
        type: TransactionType.EXPENSE
      },
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user2Categories[2].id,
        name: 'Cinema',
        value: 40.0,
        date: new Date(),
        type: TransactionType.EXPENSE
      },
      {
        userId: user1.id,
        bankAccountId: account1.id,
        categoryId: user2Categories[3].id,
        name: 'Recebimento de Salário',
        value: 3000.0,
        date: new Date(),
        type: TransactionType.INCOME
      }
    ]
  })

  console.log({ user1, user2, account1 })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect().then(() => console.log('Disconnected from database'))
  })
