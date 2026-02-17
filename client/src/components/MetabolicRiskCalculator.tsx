import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Zone = "green" | "yellow" | "red";
type Sex = "feminino" | "masculino" | "";
type YesNo = "sim" | "nao" | "";

type ProxyField =
  | "diabetes"
  | "pressureMed"
  | "cholesterolMed"
  | "longTermAttempt";

type FormState = {
  height: string;
  weight: string;
  age: string;
  sex: Sex;
  waist: string;
  diabetes: YesNo;
  pressureMed: YesNo;
  cholesterolMed: YesNo;
  longTermAttempt: YesNo;
  name: string;
  contact: string;
};

type ZoneDetails = {
  label: string;
  accent: string;
  intro: string;
  insight: string;
};

const TOTAL_STEPS = 11;

const zoneConfig: Record<Zone, ZoneDetails> = {
  green: {
    label: "Zona Verde",
    accent: "from-emerald-700 to-emerald-900",
    intro:
      "Com base nas informações que você compartilhou, seu metabolismo ainda responde bem a intervenções clínicas.",
    insight:
      "Seu cenário atual sugere baixo risco metabólico aparente, com bons sinais de resposta fisiológica.",
  },
  yellow: {
    label: "Zona Amarela",
    accent: "from-amber-500 to-amber-700",
    intro:
      "Com base nas informações que você compartilhou, seu perfil apresenta sinais consistentes de alerta metabólico.",
    insight:
      "Isso indica que seu corpo pode estar operando sob maior esforço interno para manter equilíbrio de glicose, pressão e energia.",
  },
  red: {
    label: "Zona Vermelha",
    accent: "from-rose-700 to-red-900",
    intro:
      "Com base nas informações que você compartilhou, seu perfil aponta risco metabólico elevado e sobrecarga persistente.",
    insight:
      "Esse padrão sugere adaptações biológicas importantes, com tendência de progressão quando não há abordagem especializada.",
  },
};

const loadingPhrases = [
  "Cruzando padrões clínicos...",
  "Avaliando sinais metabólicos...",
  "Traduzindo dados em insights claros...",
];

const initialForm: FormState = {
  height: "",
  weight: "",
  age: "",
  sex: "",
  waist: "",
  diabetes: "",
  pressureMed: "",
  cholesterolMed: "",
  longTermAttempt: "",
  name: "",
  contact: "",
};

const proxyQuestions: { key: ProxyField; label: string }[] = [
  { key: "diabetes", label: "Já recebeu diagnóstico de diabetes?" },
  { key: "pressureMed", label: "Usa medicação para pressão arterial?" },
  {
    key: "cholesterolMed",
    label: "Usa medicação para colesterol ou gordura no fígado?",
  },
  {
    key: "longTermAttempt",
    label:
      "Já tenta controlar peso ou metabolismo há mais de 2 anos sem sucesso definitivo?",
  },
];

function computeZone(form: FormState): Zone {
  const heightMeters = Number(form.height) / 100;
  const weight = Number(form.weight);
  const age = Number(form.age);
  const waist = Number(form.waist);
  const yesAnswers = [
    form.diabetes,
    form.pressureMed,
    form.cholesterolMed,
    form.longTermAttempt,
  ].filter((answer) => answer === "sim").length;

  let score = 0;

  if (heightMeters > 0 && weight > 0) {
    const bmi = weight / (heightMeters * heightMeters);
    if (bmi >= 35) score += 3;
    else if (bmi >= 30) score += 2;
    else if (bmi >= 27) score += 1;
  }

  if (waist > 0) {
    const isMale = form.sex === "masculino";
    const high = isMale ? 102 : 88;
    const medium = isMale ? 94 : 80;
    if (waist >= high) score += 2;
    else if (waist >= medium) score += 1;
  }

  if (age >= 55) score += 2;
  else if (age >= 40) score += 1;

  score += yesAnswers * 2;

  if (score >= 8) return "red";
  if (score >= 4) return "yellow";
  return "green";
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-luxury text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </label>
  );
}

function StepCard({
  step,
  title,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      key={step}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-luxury rounded-2xl border border-luxury p-5 shadow-luxury sm:p-8"
    >
      <div className="mb-6 border-b border-luxury/70 pb-5">
        <p className="mb-3 text-[11px] uppercase tracking-luxury text-accent">
          Auditoria metabólica pessoal
        </p>
        <h3 className="font-display text-2xl font-medium leading-tight text-foreground sm:text-3xl">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const classes =
    variant === "ghost"
      ? "border border-luxury bg-white/70 text-foreground hover:bg-white"
      : "gradient-luxury border border-primary/80 text-white shadow-md hover:shadow-luxury";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 text-sm font-medium tracking-wide transition ${classes} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

export default function MetabolicRiskCalculator({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [loadingPhrase, setLoadingPhrase] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);

  const zone = useMemo(() => computeZone(form), [form]);
  const zoneData = zoneConfig[zone];
  const progress = Math.round((step / (TOTAL_STEPS - 1)) * 100);

  useEffect(() => {
    if (step !== 6) return;

    const phraseInterval = setInterval(() => {
      setLoadingPhrase((previous) => (previous + 1) % loadingPhrases.length);
    }, 1100);

    const nextStep = setTimeout(() => {
      setStep(7);
    }, 3400);

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(nextStep);
    };
  }, [step]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const goNext = () => setStep((previous) => Math.min(previous + 1, TOTAL_STEPS - 1));
  const goBack = () => setStep((previous) => Math.max(previous - 1, 0));

  const canContinue = {
    0: true,
    1: true,
    2: Boolean(form.height && form.weight),
    3: Boolean(form.age && form.sex),
    4: Boolean(form.waist),
    5: Boolean(
      form.diabetes &&
        form.pressureMed &&
        form.cholesterolMed &&
        form.longTermAttempt,
    ),
    8: true,
    9: Boolean(form.name && form.contact),
  } as const;

  const openLeadChannel = () => {
    const summary = `${zoneData.label} - Avaliação metabólica`;
    const message = encodeURIComponent(
      `Olá, fiz a avaliação de risco metabólico e gostaria de entender melhor meu caso.\n\nNome: ${form.name}\nContato informado: ${form.contact}\nResultado: ${summary}`,
    );

    if (form.contact.includes("@")) {
      window.open(
        `mailto:${form.contact}?subject=${encodeURIComponent("Retorno da avaliação metabólica")}&body=${message}`,
        "_blank",
      );
      return;
    }

    window.open(`https://wa.me/5521999999999?text=${message}`, "_blank");
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openLeadChannel();
    goNext();
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[hsl(45_30%_98%)]">
      <div className="pointer-events-none absolute inset-0 texture-paper opacity-[0.12]" />
      <div className="relative z-10 flex items-center justify-between border-b border-luxury px-4 py-4 sm:px-6">
        <div>
          <p className="text-[11px] uppercase tracking-luxury text-accent">
            Ferramenta educativa
          </p>
          <h2 className="font-display text-xl font-medium text-foreground sm:text-2xl">
            Calculadora de Risco Metabólico
          </h2>
        </div>
        {onClose ? (
          <button
            onClick={onClose}
            className="rounded-full border border-luxury bg-white/70 px-3 py-2 text-xs font-medium uppercase tracking-luxury text-foreground transition hover:bg-white"
          >
            Fechar
          </button>
        ) : null}
      </div>

      <div className="relative z-10 px-4 pt-5 sm:px-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Etapa {step + 1} de {TOTAL_STEPS}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full border border-luxury bg-white/60">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
            className="h-full rounded-full bg-gradient-to-r from-primary via-[hsl(165_50%_22%)] to-accent"
          />
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepCard
              step={0}
              title="Avalie o seu Risco Metabólico em poucos minutos"
              subtitle="Descubra como seu metabolismo está funcionando hoje, de forma clara, sem julgamentos e sem diagnóstico."
            >
              <p className="mb-6 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Esta análise rápida utiliza critérios médicos reconhecidos para ajudar
                você a entender sinais de sobrecarga metabólica que muitas vezes passam
                despercebidos no dia a dia.
              </p>
              <ul className="mb-8 space-y-3 text-sm text-foreground/80 sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    ✓
                  </span>
                  <span>Leva menos de 2 minutos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    ✓
                  </span>
                  <span>Suas informações serão tratadas de forma confidencial</span>
                </li>
              </ul>
              <ActionButton onClick={goNext}>Começar minha avaliação</ActionButton>
            </StepCard>
          )}

          {step === 1 && (
            <StepCard
              step={1}
              title="Antes de começarmos..."
              subtitle="O metabolismo funciona como um sistema integrado."
            >
              <p className="mb-6 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Peso, idade, medidas corporais e histórico clínico contam apenas parte
                da história. Esta avaliação foi criada para identificar padrões de risco,
                traduzir dados médicos em linguagem simples e ajudar você a entender se
                faz sentido buscar uma avaliação especializada.
              </p>
              <p className="mb-8 rounded-xl border border-accent/35 bg-[hsl(40_35%_94%)] p-4 text-sm text-foreground/85">
                Esta ferramenta não substitui uma consulta médica.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="ghost" onClick={goBack}>
                  Voltar
                </ActionButton>
                <ActionButton onClick={goNext}>Entendi, vamos continuar</ActionButton>
              </div>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard
              step={2}
              title="Vamos começar com o básico"
              subtitle="Essas informações ajudam a entender como seu corpo distribui energia e gordura ao longo do tempo."
            >
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <Input
                  label="Altura (cm)"
                  type="number"
                  value={form.height}
                  onChange={(value) => updateField("height", value)}
                />
                <Input
                  label="Peso (kg)"
                  type="number"
                  value={form.weight}
                  onChange={(value) => updateField("weight", value)}
                />
              </div>
              <p className="mb-8 text-sm text-muted-foreground">
                Não existe resposta certa. Use seus dados reais.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="ghost" onClick={goBack}>
                  Voltar
                </ActionButton>
                <ActionButton onClick={goNext} disabled={!canContinue[2]}>
                  Continuar
                </ActionButton>
              </div>
            </StepCard>
          )}

          {step === 3 && (
            <StepCard
              step={3}
              title="Agora, um pouco mais de contexto"
              subtitle="Com o passar dos anos, o metabolismo naturalmente muda."
            >
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <Input
                  label="Idade"
                  type="number"
                  value={form.age}
                  onChange={(value) => updateField("age", value)}
                />
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-luxury text-muted-foreground">
                    Sexo
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {(["feminino", "masculino"] as const).map((sex) => (
                      <button
                        key={sex}
                        onClick={() => updateField("sex", sex)}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                          form.sex === sex
                            ? "gradient-luxury border-primary text-white"
                            : "border-luxury bg-white/65 text-foreground hover:bg-white"
                        }`}
                      >
                        {sex === "feminino" ? "Feminino" : "Masculino"}
                      </button>
                    ))}
                  </div>
                </label>
              </div>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="ghost" onClick={goBack}>
                  Voltar
                </ActionButton>
                <ActionButton onClick={goNext} disabled={!canContinue[3]}>
                  Continuar
                </ActionButton>
              </div>
            </StepCard>
          )}

          {step === 4 && (
            <StepCard
              step={4}
              title="Distribuição de gordura importa mais do que peso"
              subtitle="A gordura abdominal está associada a risco metabólico e cardiovascular."
            >
              <div className="mb-6 rounded-xl border border-luxury bg-white/65 p-4 text-sm text-foreground/85">
                Meça a circunferência do abdômen na altura do umbigo, sem apertar a fita.
              </div>
              <Input
                label="Circunferência abdominal (cm)"
                type="number"
                value={form.waist}
                onChange={(value) => updateField("waist", value)}
              />
              <p className="mb-8 mt-4 text-sm text-muted-foreground">
                Se não souber agora, informe uma estimativa honesta.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="ghost" onClick={goBack}>
                  Voltar
                </ActionButton>
                <ActionButton onClick={goNext} disabled={!canContinue[4]}>
                  Continuar
                </ActionButton>
              </div>
            </StepCard>
          )}

          {step === 5 && (
            <StepCard
              step={5}
              title="Agora, algumas perguntas rápidas"
              subtitle="Elas ajudam a identificar sinais indiretos de sobrecarga metabólica."
            >
              <div className="mb-8 space-y-4">
                {proxyQuestions.map((question) => (
                  <div
                    key={question.key}
                    className="rounded-xl border border-luxury bg-white/65 p-4"
                  >
                    <p className="mb-3 text-sm font-medium text-foreground">
                      {question.label}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["sim", "nao"] as const).map((answer) => (
                        <button
                          key={answer}
                          onClick={() => updateField(question.key, answer)}
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                            form[question.key] === answer
                              ? "gradient-luxury border-primary text-white"
                              : "border-luxury bg-white/65 text-foreground hover:bg-white"
                          }`}
                        >
                          {answer === "sim" ? "Sim" : "Não"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mb-8 text-sm text-muted-foreground">
                Responda com base no que você já sabe. Não é necessário ter exames em
                mãos.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="ghost" onClick={goBack}>
                  Voltar
                </ActionButton>
                <ActionButton onClick={goNext} disabled={!canContinue[5]}>
                  Ver meu resultado
                </ActionButton>
              </div>
            </StepCard>
          )}

          {step === 6 && (
            <StepCard
              step={6}
              title="Analisando seu perfil metabólico..."
              subtitle={loadingPhrases[loadingPhrase]}
            >
              <div className="py-10">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-accent/40 border-t-primary" />
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Isso leva apenas alguns segundos.
                </p>
              </div>
            </StepCard>
          )}

          {step === 7 && (
            <StepCard step={7} title="Seu Perfil Metabólico" subtitle={zoneData.label}>
              <div className={`mb-8 rounded-xl bg-gradient-to-r ${zoneData.accent} p-[1px]`}>
                <div className="rounded-xl bg-white/95 p-5">
                  <p className="mb-4 text-foreground">{zoneData.intro}</p>
                  <p className="text-muted-foreground">{zoneData.insight}</p>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Esse tipo de padrão não é falta de força de vontade. Na maioria das
                vezes, é o resultado de adaptações biológicas que se acumulam ao longo
                dos anos.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Hoje, a medicina metabólica moderna oferece estratégias capazes de
                reprogramar esse sistema, indo além de dietas e tentativas isoladas.
              </p>
              <ActionButton onClick={goNext}>Continuar</ActionButton>
            </StepCard>
          )}

          {step === 8 && (
            <StepCard step={8} title="Próximo passo (se fizer sentido para você)">
              <p className="mb-4 text-sm text-foreground/80 sm:text-base">
                Uma avaliação com um especialista pode ajudar a esclarecer:
              </p>
              <ul className="mb-8 list-disc space-y-2 pl-5 text-sm text-foreground/80 marker:text-accent sm:text-base">
                <li>O que realmente está acontecendo com seu metabolismo</li>
                <li>Quais opções médicas existem no seu caso</li>
                <li>
                  Se intervenções mais avançadas fazem sentido agora ou no futuro
                </li>
              </ul>
              <p className="mb-8 text-sm text-muted-foreground">
                Sem compromisso. Sem decisões automáticas.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="ghost" onClick={goBack}>
                  Voltar
                </ActionButton>
                <ActionButton onClick={goNext}>
                  Quero receber uma análise médica mais detalhada
                </ActionButton>
              </div>
            </StepCard>
          )}

          {step === 9 && (
            <StepCard step={9} title="Como prefere receber esse contato?">
              <form onSubmit={submitContact} className="space-y-5">
                <Input
                  label="Nome"
                  value={form.name}
                  onChange={(value) => updateField("name", value)}
                />
                <Input
                  label="WhatsApp ou e-mail"
                  value={form.contact}
                  onChange={(value) => updateField("contact", value)}
                />
                <p className="text-sm text-muted-foreground">
                  Seus dados são usados apenas para esse contato. Nenhuma informação é
                  compartilhada.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ActionButton variant="ghost" onClick={goBack}>
                    Voltar
                  </ActionButton>
                  <ActionButton type="submit" disabled={!canContinue[9]}>
                    Enviar e finalizar
                  </ActionButton>
                </div>
              </form>
            </StepCard>
          )}

          {step === 10 && (
            <StepCard step={10} title="Pronto. Obrigado por confiar em nós.">
              <p className="mb-6 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Sua avaliação foi registrada. Um profissional da equipe entrará em
                contato para orientar os próximos passos e esclarecer eventuais dúvidas.
              </p>
              <p className="mb-8 text-sm text-foreground/80 sm:text-base">
                Entender seu metabolismo é o primeiro passo para transformá-lo.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionButton onClick={() => setStep(0)}>Refazer avaliação</ActionButton>
                {onClose ? (
                  <ActionButton variant="ghost" onClick={onClose}>
                    Voltar ao site
                  </ActionButton>
                ) : null}
              </div>
            </StepCard>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 border-t border-luxury px-4 py-3 text-center text-xs text-muted-foreground sm:px-6">
        Esta ferramenta tem caráter educativo e informativo. Não substitui consulta
        médica nem estabelece diagnóstico.
      </footer>
    </div>
  );
}
