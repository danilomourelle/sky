import { Response } from "express";
import { UserController } from '../../src/controller/UserController'

describe("Testing UserController.signUp", () => {
  const userController = new UserController()

  test("Should return 'Preencha todos os campos' for empty email", async () => {

    const mockReq: any = {
      body: {
        email: '',
        senha: '123456',
        nome: 'Danilo'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }
    const mockNext: any = () => { }

    await userController.signUp(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Preencha todos os campos' for empty senha", async () => {

    const mockReq: any = {
      body: {
        email: 'danilo@email.com',
        senha: '',
        nome: 'Danilo'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const mockNext: any = () => { }

    await userController.signUp(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Preencha todos os campos' for empty nome", async () => {

    const mockReq: any = {
      body: {
        email: 'danilo@email.com',
        senha: '123456',
        nome: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const mockNext: any = () => { }

    await userController.signUp(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Email inválido' for invalid email", async () => {

    const mockReq: any = {
      body: {
        email: 'emailSemArroba',
        senha: '123456',
        nome: 'Danilo'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const mockNext: any = () => { }

    await userController.signUp(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Email inválido" });
  });
});

describe("Testing UserController.signIn", () => {
  const userController = new UserController()

  test("Should return 'Preencha todos os campos' for empty email", async () => {

    const mockReq: any = {
      body: {
        email: '',
        senha: '123456',
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }
    const mockNext: any = () => { }

    await userController.signIn(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Preencha todos os campos' for empty senha", async () => {

    const mockReq: any = {
      body: {
        email: 'danilo@email.com',
        senha: '',
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const mockNext: any = () => { }

    await userController.signIn(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Email inválido' for invalid email", async () => {

    const mockReq: any = {
      body: {
        email: 'emailSemArroba',
        senha: '123456'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    const mockNext: any = () => { }

    await userController.signIn(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Email inválido" });
  });
});
