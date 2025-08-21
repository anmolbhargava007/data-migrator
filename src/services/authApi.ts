
import { API_BASE_URL } from "@/constants/api";
import { SigninRequest, SignupRequest, AuthResponse, User, UserForManagement, ChatHistoryItem } from "@/types/auth";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
};

export const authApi = {
  signin: async (credentials: SigninRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<AuthResponse>(response);
  },

  getUsers: async (roleId: number): Promise<{ data: UserForManagement[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/user?role_id=${roleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<{ data: UserForManagement[] }>(response);
  },

  updateUser: async (userData: UserForManagement | User): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<AuthResponse>(response);
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/signin-forgotpwd`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_email: email }),
    });
    return handleResponse<AuthResponse>(response);
  },

  getUserChatHistory: async (userId: number): Promise<{ data: ChatHistoryItem[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/prompts?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<{ data: ChatHistoryItem[] }>(response);
  },
};
