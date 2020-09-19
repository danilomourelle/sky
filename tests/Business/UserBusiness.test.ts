import { UserBusiness } from "../../src/business/UserBusiness";
import { User } from "../../src/model/User";
import { userRouter } from "../../src/router/userRouter";

describe("Testing UserBusiness.insert", () => {
  let userDatabase = {};
  let hashMockManager = {};
  let idMockManager = {};
  let tokenMockManager = {};

  test("Should return 406 / 'Email já existente' for user valid response", async () => {
    expect.assertions(2);
    try {
      userDatabase = {
        getUserByEmail: jest.fn(() => true)
      }

      const userBusiness = new UserBusiness(
        userDatabase as any,
        idMockManager as any,
        hashMockManager as any,
      );

      await userBusiness.insert(
        "Danilo",
        "danilo@email.com",
        "123456"
      );
    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Email já existente");
    }
  });

  test("Should return the token in success", async () => {
    const registerSpy = jest.fn((user: User) => { });
    const getUserByEmailSpy = jest.fn().mockReturnValue(false)
    userDatabase = {
      register: registerSpy,
      getUserByEmail: getUserByEmailSpy
    };

    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const hashMockValue = 'hash'
    const hashSpy = jest.fn().mockReturnValue(hashMockValue)
    hashMockManager = {
      generateHash: hashSpy
    };

    const userBusiness = new UserBusiness(
      userDatabase as any,
      idMockManager as any,
      hashMockManager as any,
    );

    const result = await userBusiness.insert(
      'Danilo',
      'danilo@email.com',
      "123456"
    );

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('now');
    expect(hashSpy).toHaveBeenCalledWith("123456");
    expect(idSpy).toHaveBeenCalledTimes(1);
  });
});

describe("Testing UserBusiness.signIn", () => {
  let userDatabase = {};
  let hashMockManager = {};
  let idMockManager = {};
  let tokenMockManager = {};

  test("Should return 404 / 'Usuário não encontrado' for user invalid response", async () => {
    expect.assertions(2);
    try {
      userDatabase = {
        getUserByEmail: jest.fn(() => false)
      }

      const userBusiness = new UserBusiness(
        userDatabase as any,
        idMockManager as any,
        hashMockManager as any,
      );

      await userBusiness.signIn(
        "danilo@email.com",
        "123456"
      );
    } catch (err) {
      expect(err.errorCode).toBe(404);
      expect(err.message).toBe("Usuário não encontrado");
    }
  });

  test("Should return 401 / 'Usuário e/ou senha inválidos' for password not match", async () => {
    expect.assertions(2);
    try {
      const user = {
        getHash: () => 'hash'
      }
      userDatabase = {
        getUserByEmail: jest.fn(() => user)
      }

      hashMockManager = {
        compareHash: jest.fn(() => false)
      }

      const userBusiness = new UserBusiness(
        userDatabase as any,
        idMockManager as any,
        hashMockManager as any,
      );

      await userBusiness.signIn(
        "danilo@email.com",
        "123456"
      );
    } catch (err) {
      expect(err.message).toBe("Usuário e/ou senha inválidos");
      expect(err.errorCode).toBe(401);
    }
  });

  test("Should return user in success", async () => {
    const user = new User('id', 'Danilo', 'email', 'hash', 'createdAt', 'updatedAt', 'lastLogin')
    userDatabase = {
      getUserByEmail: jest.fn(() => user),
      updateLastLoginUserById: () => true,
    }

    hashMockManager = {
      compareHash: jest.fn(() => true)
    }

    const userBusiness = new UserBusiness(
      userDatabase as any,
      idMockManager as any,
      hashMockManager as any,
    );

    const response = await userBusiness.signIn(
      "danilo@email.com",
      "123456"
    );

    expect(response).toEqual(user);
  });
});

