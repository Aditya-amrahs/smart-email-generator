from pathlib import Path

from backend.services.prompt_factory import PromptFactory


BASE_DIR = Path(__file__).resolve().parent
PROMPTS_DIR = BASE_DIR / "prompts"


prompt_factory = PromptFactory(PROMPTS_DIR)


def get_system_prompt(tone: str, style: str, email_type: str = "compose") -> str:
    """Keeps the original helper entrypoint while loading prompt text from files."""
    if email_type == "reply":
        return prompt_factory.build_reply_system_prompt(tone=tone, style=style)
    return prompt_factory.build_email_system_prompt(tone=tone, style=style)
