const mailTemplates = {

    Test: `Hey dear,
            <br><br>
            This is <strong> Akshay Satish Gudhate </strong>,

            <br><br>
            Testing the mail sending API!
            <br><br>

            Have great day ahead!!`,

    Timepass: async (name) => {
        return `Hello ${name},
        
        how are you ??`;
    }

}




module.exports = mailTemplates;