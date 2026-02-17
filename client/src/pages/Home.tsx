import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Menu, X, Phone, MapPin, Clock, ChevronRight, 
  Heart, Activity, Stethoscope, Scale, MessageCircle, Star,
  GraduationCap, Award, Calendar, ArrowRight, Quote, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MetabolicRiskCalculator from "@/components/MetabolicRiskCalculator";
import doctorImage from "@assets/Dr_Annibal_Jr_Croppado_1768071809765.png";
import logoUFF from "@assets/1200px-Logo_UFF_blue.svg_1768072719623.png";
import logoHFSE from "@assets/HFSE_menos_ruim_1768072719623.png";
import logoUERJ from "@assets/cropped-logomarca-uerj_1768072719623.png";
import imgBariatrica from "@assets/generated_images/bariatric_surgery_abstract_illustration.png";
import imgColoproctologia from "@assets/generated_images/colorectal_health_abstract_illustration.png";
import imgHernia from "@assets/generated_images/hernia_surgery_abstract_illustration.png";
import imgColonoscopia from "@assets/generated_images/colonoscopy_prevention_illustration.png";
import imgVesicula from "@assets/generated_images/gallbladder_surgery_illustration.png";
import iconBariatrica from "@assets/generated_images/bariatric_scale_abstract_icon.png";
import iconColoproctologia from "@assets/generated_images/coloproctology_health_abstract_icon.png";
import iconCirurgiaGeral from "@assets/generated_images/general_surgery_icon_solid_bg.png";
import iconDialogo from "@assets/generated_images/patient_dialogue_icon_solid_bg.png";
import iconExperiencia from "@assets/generated_images/medical_experience_abstract_icon.png";
import iconLogo from "@assets/generated_images/stethoscope_icon_dark_background.png";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Artigos", href: "#artigos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const testimonialsBariátrica = [
  { text: "Amei minha cirurgia bariátrica, tendo uma excelente recuperação.", author: "Ana Paula Borges" },
  { text: "Médico excelente, atencioso, explica tudo com clareza.", author: "Késia Dias" },
  { text: "Profissional competente, me trouxe segurança em todo o processo.", author: "Nathalie M." },
];

const testimonialsColoprocto = [
  { text: "Fiz cirurgia de fístula anal com sucesso. Excelente proctologista.", author: "Helena Maria Gones" },
  { text: "Operação de hemorroidas com todo suporte no pós-operatório.", author: "Aparecida Lima" },
  { text: "Diagnóstico muito preciso e atendimento humano.", author: "Cristina" },
];

const testimonialsCirurgiaGeral = [
  { text: "Cirurgia de emergência e transcorreu super bem. Médico seguro.", author: "Carolina Rua" },
  { text: "Cirurgia de hérnia por vídeo, no dia seguinte já estava andando bem.", author: "Carlos Eduardo" },
  { text: "Cirurgia de vesícula com recuperação surpreendente.", author: "Gisele S." },
];

const allTestimonials = [
  { text: "Médico que honra a profissão.", author: "Roberto Silva" },
  { text: "Atencioso, humano e seguro.", author: "Matheus Andrade" },
  { text: "Sempre disponível para tirar dúvidas.", author: "Maria José Cordeiro" },
  { text: "Equipe excelente, atendimento impecável.", author: "Viviane Rocha" },
  { text: "Me senti acolhida desde a primeira consulta.", author: "Fernanda Costa" },
  { text: "Profissionalismo e empatia em cada etapa.", author: "Ricardo Mendes" },
  { text: "Recomendo de olhos fechados.", author: "Patrícia Santos" },
  { text: "Mudou minha qualidade de vida.", author: "João Pedro Alves" },
  { text: "Explicação clara e tratamento eficaz.", author: "Luciana Ferreira" },
];

const articles = [
  { title: "Quando a cirurgia bariátrica é realmente indicada?", category: "Bariátrica", image: imgBariatrica },
  { title: "Sangramento anal é normal?", category: "Coloproctologia", image: imgColoproctologia },
  { title: "Toda hérnia precisa operar?", category: "Cirurgia Geral", image: imgHernia },
  { title: "Colonoscopia: prevenção que salva vidas", category: "Coloproctologia", image: imgColonoscopia },
  { title: "Cirurgia de vesícula: quando não dá mais para adiar", category: "Cirurgia Geral", image: imgVesicula },
];

const faqItems = [
  {
    question: "A consulta já define se vou precisar operar?",
    answer: "Não necessariamente. A consulta é o momento de avaliação, escuta e esclarecimento. Nem todo caso exige cirurgia."
  },
  {
    question: "Cirurgia bariátrica é indicada para qualquer pessoa com sobrepeso?",
    answer: "Não. Existem critérios clínicos bem definidos e cada caso precisa ser avaliado individualmente."
  },
  {
    question: "Exames de coloproctologia são dolorosos?",
    answer: "A maioria dos exames é bem tolerada e existem recursos modernos que tornam o processo mais confortável."
  },
  {
    question: "Quanto tempo de recuperação após cirurgia de hérnia?",
    answer: "Depende do tipo de hérnia, da técnica utilizada e do perfil do paciente. Esses fatores são discutidos em consulta."
  },
];

const timeline = [
  { year: "2004–2010", title: "Medicina", institution: "Universidade Federal Fluminense" },
  { year: "2011–2013", title: "Residência em Cirurgia Geral", institution: "Hospital Federal dos Servidores do Estado" },
  { year: "2014–2016", title: "Especialização em Coloproctologia", institution: "Hospital Universitário Pedro Ernesto — UERJ" },
  { year: "Atual", title: "Atuação em equipe multidisciplinar", institution: "Cirurgia Bariátrica e Metabólica" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-luxury border-b border-luxury">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#inicio" className="flex items-center gap-3" data-testid="link-logo">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
              <img src={iconLogo} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-display text-lg font-medium text-foreground tracking-tight">Dr. Annibal Amorim Jr</p>
              <p className="text-[10px] text-muted-foreground tracking-luxury uppercase">Cirurgião Especialista</p>
            </div>
          </a>
          
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="text-sm font-normal text-foreground/70 hover:text-primary transition-colors duration-300 tracking-wide"
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              className="hidden sm:flex gradient-luxury text-white shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-500 text-sm font-normal tracking-wide"
              data-testid="button-agendar-header"
            >
              <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Agendar avaliação
            </Button>
            
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-mobile"
            >
              {isMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden glass-luxury border-t border-luxury"
        >
          <nav className="px-6 py-8 space-y-5">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="block text-base font-normal text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              className="w-full gradient-luxury text-white mt-6"
              data-testid="button-agendar-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar avaliação
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(45_30%_98%)] via-[hsl(40_25%_96%)] to-[hsl(165_20%_95%)]" />
      <div className="absolute inset-0 texture-paper opacity-30" />
      
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block text-[11px] tracking-luxury uppercase text-accent font-medium border-b border-accent/30 pb-1">
                Cirurgia Geral · Coloproctologia · Bariátrica
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] mb-8"
            >
              Medicina de alta complexidade com{" "}
              <span className="text-gradient-luxury italic">clareza, ética</span>
              <br /><span className="text-gradient-luxury italic">e cuidado humano</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg font-light"
            >
              Atendimento especializado com foco em decisões seguras, 
              acompanhamento responsável e atenção individualizada ao paciente.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-luxury text-white shadow-luxury hover:shadow-luxury-lg hover:scale-105 hover:-translate-y-1 transition-all duration-500 text-sm px-8 py-6 font-normal tracking-wide"
                data-testid="button-agendar-hero"
              >
                <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Agendar avaliação
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-primary hover:bg-primary/5 text-sm px-8 py-6 font-normal group"
                data-testid="button-especialidade-hero"
              >
                Qual especialidade atende meu caso?
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-8 bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent rounded-[2rem] blur-3xl" />
              
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-transparent to-primary/10 rounded-2xl" />
                <div className="relative rounded-xl overflow-hidden shadow-luxury-lg">
                  <img 
                    src={doctorImage} 
                    alt="Dr. Annibal Amorim Jr"
                    className="w-full h-auto object-cover"
                    data-testid="img-doctor-hero"
                  />
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur rounded-xl shadow-luxury p-5 border border-luxury hover:shadow-luxury-lg hover:border-accent/30 hover:scale-105 hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-md bg-[hsl(40_25%_96%)]">
                    <img src={iconExperiencia} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-medium text-foreground">15+</p>
                    <p className="text-[10px] text-muted-foreground tracking-luxury uppercase">Anos de experiência</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px divider-luxury" />
    </section>
  );
}

function TestimonialCarousel({ testimonials }: { testimonials: typeof testimonialsBariátrica }) {
  const [current, setCurrent] = useState(0);
  
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  
  return (
    <div className="relative">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-border/30 shadow-sm">
        <Quote className="w-8 h-8 text-accent/40 mb-6" strokeWidth={1} />
        <p className="text-foreground/80 italic mb-6 min-h-[60px] font-light text-lg leading-relaxed font-serif">
          "{testimonials[current].text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-accent/40" />
          <p className="text-sm font-medium text-primary tracking-wide">{testimonials[current].author}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
          data-testid="button-testimonial-prev"
        >
          <ChevronRight className="w-5 h-5 rotate-180" strokeWidth={1.5} />
        </button>
        
        <div className="flex gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === current ? 'bg-primary w-8' : 'bg-primary/20 w-4 hover:bg-primary/40'}`}
              data-testid={`button-testimonial-dot-${idx}`}
            />
          ))}
        </div>
        
        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
          data-testid="button-testimonial-next"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function SpecialtySection({ 
  id, 
  iconImage, 
  title, 
  description, 
  testimonials, 
  ctaText,
  onOpenCalculator,
  showMetabolicCta = false,
}: { 
  id: string;
  iconImage: string; 
  title: string; 
  description: string[];
  testimonials: typeof testimonialsBariátrica;
  ctaText: string;
  onOpenCalculator?: () => void;
  showMetabolicCta?: boolean;
}) {
  return (
    <div id={id} className="py-28 lg:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(40_20%_97%)] to-transparent opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden mb-8 shadow-luxury bg-[hsl(40_25%_96%)]">
              <img src={iconImage} alt="" className="w-full h-full object-cover" />
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-8 leading-tight">
              {title}
            </h2>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed font-light">
              {description.map((para, idx) => (
                <p key={idx} className="text-base">{para}</p>
              ))}
            </div>
            
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {showMetabolicCta && onOpenCalculator ? (
                <>
                  <Button
                    className="gradient-luxury text-white shadow-md hover:shadow-lg transition-all duration-500 font-normal tracking-wide"
                    onClick={onOpenCalculator}
                    data-testid="button-avaliar-metabolismo-bariatrica"
                  >
                    <Activity className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Avaliar metabolismo
                  </Button>
                  <Button
                    variant="ghost"
                    className="border border-primary/20 bg-white text-primary hover:bg-primary/5 font-normal tracking-wide group"
                    data-testid={`button-cta-${id}`}
                  >
                    {ctaText}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                  </Button>
                </>
              ) : (
                <Button 
                  className="gradient-luxury text-white shadow-md hover:shadow-lg transition-all duration-500 font-normal tracking-wide group"
                  data-testid={`button-cta-${id}`}
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                </Button>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:mt-28"
          >
            <p className="text-[11px] font-medium text-accent mb-6 flex items-center gap-3 tracking-luxury uppercase">
              <Star className="w-4 h-4" strokeWidth={1.5} />
              Experiências de pacientes
            </p>
            <TestimonialCarousel testimonials={testimonials} />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px divider-luxury" />
    </div>
  );
}

function SpecialtiesSection({
  onOpenCalculator,
}: {
  onOpenCalculator: () => void;
}) {
  return (
    <section id="especialidades" className="relative">
      <SpecialtySection
        id="bariatrica"
        iconImage={iconBariatrica}
        title="Cirurgia Bariátrica e Metabólica"
        description={[
          "A obesidade é uma doença complexa, com impactos físicos, metabólicos e emocionais. O tratamento cirúrgico exige muito mais do que técnica operatória: exige acompanhamento, responsabilidade e cuidado contínuo.",
          "O foco aqui não é estética, mas saúde, funcionalidade e qualidade de vida. Cada paciente passa por avaliação individualizada e integra uma jornada estruturada, com equipe multidisciplinar e acompanhamento no longo prazo."
        ]}
        testimonials={testimonialsBariátrica}
        ctaText="Entender minha jornada"
        showMetabolicCta
        onOpenCalculator={onOpenCalculator}
      />
      
      <SpecialtySection
        id="coloproctologia"
        iconImage={iconColoproctologia}
        title="Coloproctologia e Saúde Intestinal"
        description={[
          "Sintomas como dor, sangramento, desconforto ou alterações intestinais são mais comuns do que se imagina — e não devem ser tratados com vergonha ou adiamento.",
          "O cuidado em coloproctologia deve ser técnico, respeitoso e claro. O objetivo é oferecer diagnóstico preciso, tratamento adequado e conforto durante todo o processo."
        ]}
        testimonials={testimonialsColoprocto}
        ctaText="Entender meus sintomas"
      />
      
      <SpecialtySection
        id="cirurgia-geral"
        iconImage={iconCirurgiaGeral}
        title="Cirurgia Geral e Parede Abdominal"
        description={[
          "Procedimentos como cirurgia de hérnia, vesícula e abdome exigem mais do que rapidez: exigem planejamento técnico, segurança e clareza sobre cada etapa do tratamento.",
          "Cada caso é avaliado de forma individual, considerando riscos, benefícios e expectativas realistas, sempre com foco em uma recuperação segura."
        ]}
        testimonials={testimonialsCirurgiaGeral}
        ctaText="Conhecer as opções"
      />
    </section>
  );
}

function PreTriagemSection() {
  return (
    <section className="py-28 lg:py-36 relative bg-gradient-to-b from-[hsl(40_20%_97%)] to-[hsl(45_25%_98%)]">
      <div className="absolute inset-0 texture-paper opacity-20" />
      
      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-8 shadow-luxury bg-[hsl(40_25%_96%)]">
            <img src={iconDialogo} alt="" className="w-full h-full object-cover" />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-6">
            Não sabe por onde começar?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Utilize nossa ferramenta de orientação inicial. Ela não substitui a consulta médica, 
            mas pode ajudar a organizar melhor seu caminho.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="gradient-luxury text-white shadow-luxury hover:shadow-luxury-lg transition-all duration-500 text-sm px-10 py-6 font-normal tracking-wide"
                data-testid="button-pre-avaliacao"
              >
                Iniciar pré-avaliação orientativa
                <ChevronRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-white/98 backdrop-blur border-luxury">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-medium">Pré-avaliação Orientativa</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 py-6">
                <p className="text-muted-foreground text-sm font-light">
                  Responda algumas perguntas para ajudar a identificar qual especialidade pode atender melhor seu caso.
                </p>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Qual seu principal sintoma ou preocupação?</span>
                    <select className="mt-2 w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 transition-all" data-testid="select-sintoma">
                      <option>Selecione...</option>
                      <option>Obesidade / Dificuldade para perder peso</option>
                      <option>Dor ou sangramento anal</option>
                      <option>Alterações intestinais</option>
                      <option>Dor abdominal / Hérnia</option>
                      <option>Problemas na vesícula</option>
                      <option>Outro</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Há quanto tempo você apresenta esse sintoma?</span>
                    <select className="mt-2 w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 transition-all" data-testid="select-tempo">
                      <option>Selecione...</option>
                      <option>Menos de 1 mês</option>
                      <option>1 a 6 meses</option>
                      <option>6 meses a 1 ano</option>
                      <option>Mais de 1 ano</option>
                    </select>
                  </label>
                </div>
                <Button className="w-full gradient-luxury text-white mt-4 font-normal" data-testid="button-enviar-triagem">
                  <Send className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Enviar para orientação
                </Button>
                <p className="text-xs text-muted-foreground text-center font-light">
                  Esta ferramenta não substitui a consulta médica presencial.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}

function SobreSection() {
  return (
    <section id="sobre" className="py-28 lg:py-36 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px divider-luxury" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] tracking-luxury uppercase text-accent font-medium mb-4">Trajetória</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
            Formação sólida para decisões seguras
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify font-light" style={{ textAlignLast: 'left', hyphens: 'none', wordBreak: 'keep-all' }}>
              Médico formado pela Universidade Federal Fluminense, com residência em Cirurgia Geral no Hospital Federal dos Servidores do Estado e especialização em Coloproctologia pelo Hospital Universitário Pedro Ernesto (UERJ).
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify font-light" style={{ textAlignLast: 'left', hyphens: 'none', wordBreak: 'keep-all' }}>
              Atua com foco em cuidado responsável, clareza no diagnóstico e acompanhamento ético em todas as etapas do tratamento, integrando conhecimento técnico e atenção individualizada ao paciente.
            </p>
            
            <div className="mt-14 pt-10 border-t border-border/50 text-center">
              <p className="text-[11px] text-muted-foreground uppercase tracking-luxury mb-6">Formação acadêmica</p>
              <div className="flex items-center justify-center gap-12 flex-wrap">
                <img src={logoUFF} alt="Universidade Federal Fluminense" className="h-16 object-contain opacity-60 hover:opacity-100 transition-opacity duration-500" />
                <img src={logoHFSE} alt="Hospital Federal dos Servidores do Estado" className="h-24 object-contain opacity-60 hover:opacity-100 transition-opacity duration-500" />
                <img src={logoUERJ} alt="Universidade do Estado do Rio de Janeiro" className="h-20 object-contain opacity-60 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-primary/50" />
              
              <div className="space-y-10">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-8"
                  >
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white border-2 border-primary/60 shadow-sm" />
                    <span className="text-[11px] font-medium text-accent uppercase tracking-luxury">{item.year}</span>
                    <h3 className="font-display text-xl font-medium text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light mt-1">{item.institution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DepoimentosSection() {
  return (
    <section id="depoimentos" className="py-28 lg:py-36 bg-gradient-to-b from-[hsl(40_20%_97%)] to-white relative">
      <div className="absolute top-0 left-0 right-0 h-px divider-luxury" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] tracking-luxury uppercase text-accent font-medium mb-4">Testemunhos</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Experiências de pacientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Relatos reais de pacientes atendidos em diferentes contextos e especialidades.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-border/30 hover:shadow-md hover:border-accent/20 transition-all duration-500"
              data-testid={`card-testimonial-${idx}`}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" strokeWidth={1} />
                ))}
              </div>
              <p className="text-foreground/80 italic mb-5 font-serif text-base leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-accent/40" />
                <p className="text-sm font-medium text-primary">{testimonial.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtigosSection() {
  return (
    <section id="artigos" className="py-28 lg:py-36 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px divider-luxury" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] tracking-luxury uppercase text-accent font-medium mb-4">Conhecimento</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Clareza reduz o medo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Informação de qualidade faz parte do cuidado. Conteúdos educativos 
            para entender melhor seu corpo, seus sintomas e suas opções.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-gradient-to-br from-[hsl(40_20%_98%)] to-[hsl(45_25%_99%)] rounded-xl overflow-hidden shadow-sm border border-border/30 hover:shadow-lg hover:border-accent/20 transition-all duration-500 cursor-pointer"
              data-testid={`card-article-${idx}`}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8">
                <span className="text-[10px] font-medium text-accent uppercase tracking-luxury">{article.category}</span>
                <h3 className="font-display text-lg font-medium text-foreground mt-3 mb-5 group-hover:text-primary transition-colors duration-300 leading-snug">
                  {article.title}
                </h3>
                <span className="inline-flex items-center text-sm text-primary font-normal group" data-testid={`button-ler-artigo-${idx}`}>
                  Ler artigo
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-28 lg:py-36 bg-gradient-to-b from-[hsl(40_20%_97%)] to-white relative">
      <div className="absolute top-0 left-0 right-0 h-px divider-luxury" />
      
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] tracking-luxury uppercase text-accent font-medium mb-4">Dúvidas</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
            Perguntas frequentes
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-border/30 px-8 shadow-sm data-[state=open]:shadow-md transition-all duration-300"
                data-testid={`accordion-faq-${idx}`}
              >
                <AccordionTrigger className="text-left font-display text-lg font-medium text-foreground hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 font-light leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function ContatoSection() {
  return (
    <section id="contato" className="py-28 lg:py-36 bg-gradient-to-b from-[hsl(165_40%_18%)] to-[hsl(165_45%_12%)] text-white relative overflow-hidden">
      <div className="absolute inset-0 texture-paper opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] tracking-luxury uppercase text-white/50 font-medium mb-4">Contato</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium mb-10">
              Agende sua avaliação
            </h2>
            
            <div className="space-y-8 mb-12">
              <a href="https://wa.me/5521999999999" className="flex items-center gap-5 group" data-testid="link-whatsapp">
                <div className="w-14 h-14 rounded-full bg-green-500/90 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-lg">WhatsApp</p>
                  <p className="text-white/60 font-light">(21) 99999-9999</p>
                </div>
              </a>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-lg">Telefone</p>
                  <p className="text-white/60 font-light">(21) 3333-4444</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-lg">Endereço</p>
                  <p className="text-white/60 font-light">Av. das Américas, 500 - Sala 301<br />Barra da Tijuca, Rio de Janeiro</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-lg">Horário</p>
                  <p className="text-white/60 font-light">Segunda a Sexta: 9h às 18h</p>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-400 text-white shadow-luxury transition-all duration-500 font-normal tracking-wide"
              data-testid="button-whatsapp-contato"
            >
              <MessageCircle className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Falar pelo WhatsApp
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden h-80 lg:h-auto shadow-luxury-lg"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.0980726731!2d-43.36456!3d-22.99871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU5JzU1LjQiUyA0M8KwMjEnNTIuNCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Consultório"
              data-testid="map-contato"
            />
          </motion.div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Cada paciente é único. Nenhuma conduta é tomada sem avaliação individual e responsável. 
            Este site tem caráter informativo e educativo.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(165_50%_8%)] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={iconLogo} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="font-display text-lg font-medium">Dr. Annibal Amorim Jr</p>
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Cirurgião com tripla especialização em Cirurgia Geral, Coloproctologia e Cirurgia Bariátrica.
            </p>
          </div>
          
          <div>
            <h4 className="text-[11px] font-medium tracking-luxury uppercase text-white/40 mb-6">Especialidades</h4>
            <ul className="space-y-3 text-white/60 text-sm font-light">
              <li><a href="#bariatrica" className="hover:text-white transition-colors duration-300">Cirurgia Bariátrica</a></li>
              <li><a href="#coloproctologia" className="hover:text-white transition-colors duration-300">Coloproctologia</a></li>
              <li><a href="#cirurgia-geral" className="hover:text-white transition-colors duration-300">Cirurgia Geral</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] font-medium tracking-luxury uppercase text-white/40 mb-6">Links</h4>
            <ul className="space-y-3 text-white/60 text-sm font-light">
              <li><a href="#sobre" className="hover:text-white transition-colors duration-300">Sobre o Médico</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors duration-300">Depoimentos</a></li>
              <li><a href="#artigos" className="hover:text-white transition-colors duration-300">Artigos</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors duration-300">Perguntas Frequentes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] font-medium tracking-luxury uppercase text-white/40 mb-6">Registro</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              CRM-RJ 00000000<br />
              RQE 00000 (Cirurgia Geral)<br />
              RQE 00000 (Coloproctologia)
            </p>
          </div>
        </div>
        
        <div className="mt-16 pt-10 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs font-light">
            Este site tem caráter informativo e educativo. As informações não substituem a consulta médica presencial.
          </p>
          <p className="text-white/30 text-xs font-light mt-2">
            © {new Date().getFullYear()} Dr. Annibal Amorim Jr. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const openCalculator = () => setIsCalculatorOpen(true);
  const closeCalculator = () => setIsCalculatorOpen(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SpecialtiesSection onOpenCalculator={openCalculator} />
        <PreTriagemSection />
        <SobreSection />
        <DepoimentosSection />
        <ArtigosSection />
        <FAQSection />
        <ContatoSection />
      </main>
      <Footer />

      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
        <DialogContent className="h-[92vh] w-[min(1100px,96vw)] max-w-none overflow-hidden border-luxury bg-white p-0 shadow-luxury-lg">
          <MetabolicRiskCalculator onClose={closeCalculator} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
