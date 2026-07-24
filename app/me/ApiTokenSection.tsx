"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { generateApiToken } from "@/app/actions/account";

interface ApiTokenSectionProps {
  initialToken: string | null;
}

export default function ApiTokenSection({
  initialToken,
}: ApiTokenSectionProps) {
  const router = useRouter();
  const [token, setToken] = useState(initialToken);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    setToken(null);

    startTransition(async () => {
      const result = await generateApiToken();
      setToken(result.token);
      router.refresh();
    });
  };

  return (
    <section className="profile-card" data-testid="api-token-section">
      <h2>API token</h2>
      {token ? (
        <div className="token-display" data-testid="token-display">
          <code data-testid="api-token">{token}</code>
        </div>
      ) : isPending ? (
        <p>Generating token...</p>
      ) : (
        <p data-testid="no-token-message">
          You have not generated an API token yet.
        </p>
      )}
      <form action={handleSubmit}>
        <button
          data-testid="generate-token-button"
          disabled={isPending}
          type="submit"
        >
          {isPending
            ? "Generating..."
            : initialToken
              ? "Replace token"
              : "Generate token"}
        </button>
      </form>
    </section>
  );
}
