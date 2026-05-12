from pathlib import Path


class PromptFactory:
    """Loads prompt text from files and assembles the final prompt for each feature."""

    def __init__(self, prompts_dir: Path | None = None) -> None:
        base_dir = Path(__file__).resolve().parents[1]
        self.prompts_dir = prompts_dir or (base_dir / "prompts")

    def build_email_system_prompt(self, tone: str, style: str) -> str:
        return "\n\n".join(
            [
                self._read("base_rules.txt"),
                self._read(f"{style}_style.txt"),
                self._read("email_generation.txt"),
                f"Requested tone: {tone}",
            ]
        )

    def build_subject_system_prompt(self, tone: str, style: str) -> str:
        return "\n\n".join(
            [
                self._read("base_rules.txt"),
                self._read(f"{style}_style.txt"),
                self._read("subject_gen.txt"),
                f"Requested tone: {tone}",
            ]
        )

    def build_reply_system_prompt(self, tone: str, style: str) -> str:
        return "\n\n".join(
            [
                self._read("base_rules.txt"),
                self._read(f"{style}_style.txt"),
                self._read("reply_gen.txt"),
                f"Requested tone: {tone}",
            ]
        )

    def build_email_user_prompt(
        self,
        prompt: str,
        tone: str,
        style: str,
        recipient_name: str | None,
        sender_name: str | None,
        additional_context: str | None,
    ) -> str:
        return (
            f"User request: {prompt}\n"
            f"Tone: {tone}\n"
            f"Style: {style}\n"
            f"Recipient name: {recipient_name or 'Not provided'}\n"
            f"Sender name: {sender_name or 'Not provided'}\n"
            f"Additional context: {additional_context or 'Not provided'}"
        )

    def build_subject_user_prompt(
        self,
        email_body: str,
        tone: str,
        style: str,
        context: str | None,
    ) -> str:
        return (
            f"Email body:\n{email_body}\n\n"
            f"Tone: {tone}\n"
            f"Style: {style}\n"
            f"Context: {context or 'Not provided'}"
        )

    def build_reply_user_prompt(
        self,
        original_email: str,
        reply_goal: str,
        tone: str,
        style: str,
        recipient_name: str | None,
        sender_name: str | None,
        additional_context: str | None,
    ) -> str:
        return (
            f"Original email:\n{original_email}\n\n"
            f"Reply goal: {reply_goal}\n"
            f"Tone: {tone}\n"
            f"Style: {style}\n"
            f"Recipient name: {recipient_name or 'Not provided'}\n"
            f"Sender name: {sender_name or 'Not provided'}\n"
            f"Additional context: {additional_context or 'Not provided'}"
        )

    def _read(self, file_name: str) -> str:
        return (self.prompts_dir / file_name).read_text(encoding="utf-8").strip()
