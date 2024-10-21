import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(100);
  const transferAccount = getBankAccount(50);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = bankAccount.getBalance();
    expect(initialBalance).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(150);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(200, transferAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(50, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(70);
    expect(bankAccount.getBalance()).toBe(80);
  });

  test('should transfer money', () => {
    bankAccount.transfer(50, transferAccount);
    expect(bankAccount.getBalance()).toBe(30);
    expect(transferAccount.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.unmock('lodash');
    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => 1);
    const fetchBalance = await bankAccount.fetchBalance();
    expect(typeof fetchBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(50);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
