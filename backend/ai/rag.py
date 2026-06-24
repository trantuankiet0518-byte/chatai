from google import genai
from backend.core.config import settings

# Initialize Gemini client
# Note: In a real environment, you'd ensure the API key is present.
# The user provided the client initialization in the plan.
client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def call_gemini(prompt: str):
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )
    return response.text

async def get_embedding(text: str) -> list[float]:
    # Use Gemini embedding model
    result = client.models.embed_content(
        model="text-embedding-004",
        content=text
    )
    return result.embeddings[0].values

async def generate_answer(query: str, context: list[str]):
    context_str = "\n".join(context)
    prompt = f"Use the following context to answer the question: {query}\n\nContext:\n{context_str}"
    return await call_gemini(prompt)
