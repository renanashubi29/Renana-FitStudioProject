const BASE_URL = import.meta.env.VITE_API_URL;
export const getAllPlansApi = async () => {
    try {
    
        const response = await fetch(`${BASE_URL}/plans`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
          
            throw new Error(result.message || 'Error loading subscriptions');
        }

     
        return result.data; 
    } catch (error) {
       
        console.error("Fetch plans error:", error);
        throw error;
    }
};