export const SuccessMessages = {
    PLANS: {
        GET_ALL: "Plans fetched successfully",
        GET_BY_ID: "Plan fetched successfully",
        CREATED: "Plan created successfully",
        UPDATED: "Plan updated successfully",
        DELETED: "Plan deleted successfully",
        RESET: "Plans reset successfully"
    },
    WORKOUTS: {
        GET_ALL: "Workouts fetched successfully",
        GET_BY_ID: "Workout fetched successfully",
        CREATED: "Workout created successfully",
        UPDATED: "Workout updated successfully",
        DELETED: "Workout deleted successfully",
        RESET: "Workouts reset successfully"
    },
    USERS: {
        GET_ALL: "Users fetched successfully",
        GET_BY_ID: "User fetched successfully",
        CREATED: "User created successfully",
        UPDATED: "User updated successfully",
        DELETED: "User deleted successfully",
        REGISTER: "User registered successfully",
        LOGIN: "Login successful",
        PASSWORD_CHANGED: "Password updated successfully",
        RESET: "Users reset successfully"
    },
    REGISTRATIONS: {
        GET_ALL: "Registrations fetched successfully",
        GET_BY_ID: "Registration fetched successfully",
        CREATED: "Registration created successfully",
        UPDATED: "Registration updated successfully",
        DELETED: "Registration cancelled successfully",
        RESET: "Registrations reset successfully"
    }
};

export const ErrorMessages = {
    PLANS: {
        GET_ALL: "Error fetching plans",
        NOT_FOUND: "Plan not found",
        CREATE_FAILED: "Error creating plan",
        UPDATE_FAILED: "Error updating plan",
        DELETE_FAILED: "Error deleting plan",
        RESET_FAILED: "Error resetting plans"
    },
    WORKOUTS: {
        GET_ALL: "Error fetching workouts",
        NOT_FOUND: "Workout not found",
        CREATE_FAILED: "Error creating workout",
        UPDATE_FAILED: "Error updating workout",
        DELETE_FAILED: "Error deleting workout",
        RESET_FAILED: "Error resetting workouts"
    },
    USERS: {
        GET_ALL: "Error fetching users",
        NOT_FOUND: "User not found",
        CREATE_FAILED: "Error creating user",
        UPDATE_FAILED: "Error updating user",
        DELETE_FAILED: "Error deleting user",
        REGISTER_FAILED: "Failed to register user",
        LOGIN_FAILED: "Login failed",
        PASSWORD_CHANGE_FAILED: "Failed to change password",
        RESET_FAILED: "Error resetting users"
    },
    REGISTRATIONS: {
        GET_ALL: "Error fetching registrations",
        NOT_FOUND: "Registration not found",
        CREATE_FAILED: "Error creating registration",
        UPDATE_FAILED: "Error updating registration",
        DELETE_FAILED: "Error deleting registration",
        RESET_FAILED: "Error resetting registrations"
    },
    GENERAL: {
        INTERNAL_ERROR: "Internal server error",
        INVALID_ID: (id) => `Invalid ID provided: ${id}`,
        NO_CONTENT: "No data found"
    }
};