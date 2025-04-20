import Constants from "expo-constants";

const openaiApiKey = Constants.expoConfig?.extra?.openaiApiKey;

export async function parseTranscript(props: {
  transcript: string;
}): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: `You are a transcript -> todo list converter.
            I want you to take this transcript and convert it into a todo list.
            I don't want you to inlcude ANYTHING that is not relevant for the user to do, only include tasks that the user must complete based on the transcript.
            Keep in mind that you are being used for eductional purposes (eg. students planning their day, teachers lecsuring students and mentioning due dates/upcoming assessments.
            ALWAYS say the day of the week, so instead of "the day after monday", say "tuesdy".
            ONLY focus on educational content. If, for example, I am ordering a pizza and I am discussing the homework also, only focus on school and educational stuff, so you would worry
            about the homework assignment and NOT the pizza. So only include educational stuff in the to do list.
            Please respond in PLAIN TEXT with 0 markdown. Please add a new line under each task. Keep the tasks concise and direct with only 1-2 sentences per task.
            ALWAYS have the todo list item be the desired outcome. Make sure to make the amount of todo items as concise as possible, if you can do less, do less, for example, assume the user already confirmed a due date, so don't include it in
            the todo list.
            DO NOT add any unnessasry things to the to do list AKA ONLY add items to the todo list ONLY if they are mentioned in the transcript AND are about educational things. Respond with nothing if there
            is nothing in the transcript, for example. Remember, keep things as concise and direct as possible.
            YOU DON'T ALWAYS HAVE TO, but if you MUST write in a POV, first-person is preferred.
            The format:
            <TASK 1 HERE>

            <TASK 2 HERE>

            <TASK 3 HERE>
            ...
            `,
          },
          {
            role: "user",
            content: props.transcript,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in parsing transcript:", error);
    throw error;
  }
}
