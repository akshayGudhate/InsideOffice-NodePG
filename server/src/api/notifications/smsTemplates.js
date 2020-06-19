const smsTemplates = {

    Test: `Hey dear,
    
            This is Akshay Satish Gudhate,

            Testing the msg sending API!

            Have great day ahead!!`,

    Timepass: async () => {
        return Date.now.toString();
    }

}


module.exports = smsTemplates;