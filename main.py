import json
from prompts import get_system_prompt

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()


model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=1.0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

if __name__ == "__main__":
    prompt = get_system_prompt(tone="formal", style="corporate", email_type="compose")

    messages = [
        ("system", prompt),
        ("human", "write me an email to apply for a three day leave"),
    ]
    res = model.invoke(messages)
    email = json.loads(res.content)

    print(f"subject: {email["subject"]}")
    print(f"body: {email["body"]}")
