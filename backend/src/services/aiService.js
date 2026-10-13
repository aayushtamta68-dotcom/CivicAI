
const axios = require("axios");

async function predictComplaint(title, description) {
    const baseUrl = process.env.AI_SERVICE_URL;

    if (!baseUrl) {
        throw new Error("AI_SERVICE_URL is not configured.");
    }

    try {
        const response = await axios.post(
            `${baseUrl.replace(/\/+$/, "")}/predict`,
            {
                title,
                description
            },
            {
                timeout: 30000
            }
        );

        const result = response.data;

        if (
            !result ||
            typeof result.department !== "string" ||
            typeof result.priority !== "string" ||
            typeof result.confidence !== "number"
        ) {
            throw new Error("Invalid response from AI service.");
        }

        return result;
    } catch (error) {
        console.error(
            "AI Service Error:",
            error.response?.status || error.message
        );

        throw new Error(
            "AI prediction is currently unavailable. Please try again."
        );
    }
}

module.exports = {
    predictComplaint
};
