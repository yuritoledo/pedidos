'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]{3}$/;

function validateSlug(slug: string): string | null {
  if (slug.length < 3 || slug.length > 40) return 'O endereço deve ter entre 3 e 40 caracteres';
  if (!SLUG_REGEX.test(slug)) return 'Apenas letras minúsculas, números e hífens. Não pode começar ou terminar com hífen';
  return null;
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    whatsappNumber: '',
    password: '',
  });
  const [slugError, setSlugError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSlugChange(value: string) {
    const normalized = value.toLowerCase().replace(/\s/g, '-');
    setForm((f) => ({ ...f, slug: normalized }));
    setSlugError(validateSlug(normalized));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const slugValidation = validateSlug(form.slug);
    if (slugValidation) {
      setSlugError(slugValidation);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setSlugError('Este endereço já está em uso');
        } else {
          setError(data.error ?? 'Erro ao cadastrar loja');
        }
        return;
      }

      setSuccess(true);
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h1 className="text-2xl font-bold">Cadastro recebido!</h1>
          <p className="text-muted-foreground">
            Sua loja foi cadastrada e está em análise. Entraremos em contato em breve.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Cadastre sua loja</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Preencha os dados abaixo para solicitar sua loja. Após análise, você receberá acesso ao painel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nome da loja *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Ex: Minha Loja"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="slug">Endereço da loja *</Label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground whitespace-nowrap">/</span>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="minha-loja"
                required
              />
            </div>
            {slugError && <p className="text-xs text-red-500">{slugError}</p>}
            {!slugError && form.slug && (
              <p className="text-xs text-muted-foreground">Sua loja ficará em /{form.slug}/produtos</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="whatsappNumber">WhatsApp *</Label>
            <Input
              id="whatsappNumber"
              value={form.whatsappNumber}
              onChange={(e) => setForm((f) => ({ ...f, whatsappNumber: e.target.value }))}
              placeholder="5519991234567"
              required
            />
            <p className="text-xs text-muted-foreground">Número com código do país e DDD, sem espaços</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Breve descrição da sua loja"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Senha do painel *</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Crie uma senha segura"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading || !!slugError}>
            {loading ? 'Enviando...' : 'Solicitar cadastro'}
          </Button>
        </form>
      </div>
    </main>
  );
}
