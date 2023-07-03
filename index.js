import openai from './config/openai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';
const main = async () => {
    console.log(colors.bold.green('Welcome to the OpenAI Chatbot!'));
    console.log(colors.bold.green('You can start chatting with the bot.'));

    const chatHistory = []; //store conversation history
    while (true) {
        console.log('');
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {
            // Contruct messages array from chat history
            const messages = chatHistory.map(([role, content]) => ({
                role,
                content,
            }));

            // Add latest user input
            messages.push({ role: 'user', content: userInput });

            // call api with user input
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });

            // get completion text/content
            const completionText = completion.data.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                // when userInput is exit, chat completion returns exit message
                console.log(colors.green('Bot: ') + completionText);
                console.log('');
                return;
            }
            console.log(' ');
            console.log(colors.green('Bot: ') + completionText);
            console.log('');
            console.log(colors.rainbow('__________________'));

            // Update chatHistory with user input and assistant respnse
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            console.log(colors.red(error));
        }
    }
};

main();
