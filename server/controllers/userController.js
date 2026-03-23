
import { 
  changePasswordService,
  createUser, 
  deleteUserById, 
  getAllUsers, 
   getAllCoaches,
  getUserById, 
  loginUserService, 
  registerUserService, 
  resetUsersFromFile, 
  updateUserById ,
  getUserByToken
 
} from "../services/userService.js";

import { serverResponse } from "../utils/serverResponse.js";

import { SuccessMessages, ErrorMessages } from "../utils/messages.js";

export const resetUsersController = async (req, res) => {
  try {
    const allUsers = await resetUsersFromFile();
    return serverResponse(res, 201, { 
      message: SuccessMessages.USERS.RESET, 
      data: allUsers 
    });
  } catch (error) {
    return serverResponse(res, 400, { 
      message: ErrorMessages.USERS.RESET_FAILED, 
      error: error.message 
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
      return serverResponse(res, 204, { 
        message: ErrorMessages.USERS.GET_ALL 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.GET_ALL, 
      data: users 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.USERS.GET_ALL, 
      error: error.message 
    });
  }
};
export const getAllCoachesController = async (req, res) => {
  try {
    const users = await getAllCoaches();
    if (!users || users.length === 0) {
      return serverResponse(res, 204, { 
        message: ErrorMessages.USERS.GET_ALL 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.GET_ALL, 
      data: users 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.USERS.GET_ALL, 
      error: error.message 
    });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return serverResponse(res, 404, { 
        message: ErrorMessages.USERS.NOT_FOUND 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.GET_BY_ID, 
      data: user 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.GENERAL.INVALID_ID(req.params.id), 
      error: error.message 
    });
  }
};

export const createUserController = async (req, res) => {
  try {
    const userData = { ...req.body }
    const savedUser = await createUser(userData);
    return serverResponse(res, 201, { 
      message: SuccessMessages.USERS.CREATED, 
      data: savedUser 
    });
  } catch (error) {
    return serverResponse(res, 400, { 
      message: ErrorMessages.USERS.CREATE_FAILED, 
      error: error.message 
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);
    if (!deletedUser) {
      return serverResponse(res, 404, { 
        message: ErrorMessages.USERS.NOT_FOUND 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.DELETED, 
      data: deletedUser 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.USERS.DELETE_FAILED, 
      error: error.message 
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await updateUserById(id, req.body);
    if (!updatedUser) {
      return serverResponse(res, 404, { 
        message: ErrorMessages.USERS.NOT_FOUND 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.UPDATED, 
      data: updatedUser 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.USERS.UPDATE_FAILED, 
      error: error.message 
    });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    return serverResponse(res, 201, { 
      message: SuccessMessages.USERS.REGISTER, 
      data: { token: result.token, user: result.user } 
    });
  } catch (error) {
    return serverResponse(res, error.status || 400, { 
      message: ErrorMessages.USERS.REGISTER_FAILED,
      error: error.message 
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.LOGIN, 
      data: { token: result.token, user: result.user } 
    });
  } catch (error) {
    return serverResponse(res, error.status || 500, { 
      message: ErrorMessages.USERS.LOGIN_FAILED,
      error: error.message 
    });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const updatedUser = await changePasswordService(id, oldPassword, newPassword);
    return serverResponse(res, 200, { 
      message: SuccessMessages.USERS.PASSWORD_CHANGED, 
      data: updatedUser 
    });
  } catch (error) {
    return serverResponse(res, error.status || 500, { 
      message: ErrorMessages.USERS.PASSWORD_CHANGE_FAILED,
      error: error.message 
    });
  }
};
export const getUserByTokenController = async (req, res) => {
  try {
    // מחלצים את הטוקן מה-Headers (למשל: Bearer <token>)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = await getUserByToken(token);
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};