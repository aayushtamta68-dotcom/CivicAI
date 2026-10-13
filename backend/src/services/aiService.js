const axios = require("axios");

async function predictComplaint(title, description) {

    try {

        const response = await axios.post(

            `${process.env.AI_SERVICE_URL}/predict`,

            {
                title,
                description
            }

        );

        return response.data;

    } catch (error) {

        console.error("AI Service Error:", error.message);

        return {
            department: "Roads",
            priority: "Medium",
            confidence: 0
        };

    }

}

module.exports = {
    predictComplaint
};