import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const balance = 555;
    const bankAccount = getBankAccount(balance);

    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const bill = 101;
    const bankAccount = getBankAccount(balance);

    expect(() => bankAccount.withdraw(bill)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const bill = 101;
    const bankAccount1 = getBankAccount(balance);
    const bankAccount2 = getBankAccount(0);

    expect(() => bankAccount1.transfer(bill, bankAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const bill = 50;
    const bankAccount = getBankAccount(balance);

    expect(() => bankAccount.transfer(bill, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 100;
    const deposit = 50;
    const bankAccount = getBankAccount(balance);

    bankAccount.deposit(deposit);

    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const balance = 101;
    const withdraw = 50;
    const bankAccount = getBankAccount(balance);

    bankAccount.withdraw(withdraw);

    expect(bankAccount.getBalance()).toBe(51);
  });

  test('should transfer money', () => {
    const balance1 = 101;
    const transfer = 50;
    const bankAccount = getBankAccount(balance1);

    const balance2 = 101;
    const otherAccount = getBankAccount(balance2);

    bankAccount.transfer(transfer, otherAccount);

    expect(bankAccount.getBalance()).toBe(51);
    expect(otherAccount.getBalance()).toBe(151);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const startBalance = 100;
    const bankAccount = getBankAccount(startBalance);

    jest.mocked(random).mockReturnValue(1);
    const balance = await bankAccount.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(50);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
