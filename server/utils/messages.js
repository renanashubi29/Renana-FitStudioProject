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
        RESET: "Workouts reset successfully",
        SYNC_CATALOG: "Active workouts synchronized from catalog successfully",
        ALREADY_UP_TO_DATE: "Schedule is already up to date",
        GET_UPCOMING: "Upcoming workouts for the next 7 days fetched successfully",
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
        RESET: "Registrations reset successfully",
        GET_BY_USER: "User registrations fetched successfully",
        GET_BY_WORKOUT: "Workout attendees fetched successfully",
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
        RESET_FAILED: "Error resetting workouts",
        SYNC_CATALOG_FAILED: "Failed to sync active workouts from catalog",
        GET_UPCOMING_FAILED: "Error fetching upcoming workouts",
        RESET_CATALOG_FAILED: "Failed to reset workouts from catalog" // עבור פונקציית ה-reset        
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
        GET_BY_USER: "Error fetching user registrations",            
        GET_BY_WORKOUT: "Error fetching workout registrations",        
        NO_USER_REGISTRATIONS: "No registrations found for this user", 
        NO_WORKOUT_REGISTRATIONS: "No attendees registered for this workout yet",
        CREATE_FAILED: "Error creating registration",
        UPDATE_FAILED: "Error updating registration",
        DELETE_FAILED: "Error deleting registration",
        RESET_FAILED: "Error resetting registrations",
        ID_MISSING: "Registration ID is missing",                      
        TOO_LATE_TO_CANCEL: "Cancellation blocked: Less than 24 hours remaining until workout" 
    },
    GENERAL: {
        INTERNAL_ERROR: "Internal server error",
        INVALID_ID: (id) => `Invalid ID provided: ${id}`,
        NO_CONTENT: "No data found"
    }
};